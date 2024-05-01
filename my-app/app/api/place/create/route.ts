import prisma from "@/app/lib/prisma"
import { getServerSession } from "next-auth/next"
import authOptions from "@/app/lib/AuthProvider"

export async function POST(request: Request){

    try {
        
        const session = await getServerSession(authOptions)

        if(!session){
            return new Response( JSON.stringify({
                statusCode: 401,
                message: "กรุณาเข้าสู่ระบบก่อนดำเนินการ"
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
            const createPlace = await prisma.place.create({
                data:{
                    planId: res[0],
                    order: res[1],
                    name: res[2],
                    googlePlaceId: res[3],
                    date: res[4]
                    
                }
            })

            if(createPlace){
                return new Response( JSON.stringify({
                    statusCode: 200,
                    data: createPlace
                }) , {
                    status: 200
                })
            }

            return new Response( JSON.stringify({
                statusCode: 400,
                message: 'เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้งในภายหลัง'
            }) , {
                status: 400
            })
        }

        

    } catch (error) {
        return new Response( JSON.stringify({
            statusCode: 400,
            message: 'เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้งในภายหลัง'
        }) , {
            status: 400
        })
    }
    
}