import prisma from "@/app/lib/prisma"
import { getServerSession } from "next-auth/next"
import authOptions from "@/app/lib/AuthProvider"

export async function POST(request: Request){

    try {
        
        const session = await getServerSession(authOptions)

        if(!session){
            return new Response( JSON.stringify({
                statusCode: 401,
                message: "Access denied. Please log in to proceed."
            }) , {
                status: 401
            })
        }

        const res = await request.json()

        if(!res[0] && !res[1]){
            return new Response( JSON.stringify({
                statusCode: 400,
                message: 'กรุณาใส่ให้เรียบร้อยก่อนกดเพิ่มข้อมูล'
            }) , {
                status: 400
            })
        }

        const checkDraftPlan = await prisma.plan.count({
            where: {
                ownerId: session.user.id,
                status: 'draft'
            }
        })

        if(checkDraftPlan > 1){

            return new Response( JSON.stringify({
                statusCode: 400,
                message: "You're already create 2 draft plan"
            }) , {
                status: 400
            })

        }else{
            const createPlan = await prisma.plan.create({
                data: {
                    startDate: res[0],
                    endDate: res[1],
                    ownerId: session.user.id
                }
            })

            if(createPlan){
                return new Response( JSON.stringify({
                    statusCode: 200,
                    data: createPlan
                }) , {
                    status: 200
                })
            }

            return new Response( JSON.stringify({
                statusCode: 400,
                message: 'Unknown error occurred.'
            }) , {
                status: 400
            })
        }

        

    } catch (error) {
        return new Response( JSON.stringify({
            statusCode: 400,
            message: 'Unknown error occurred.'
        }) , {
            status: 400
        })
    }
    
}