import prisma from "@/app/lib/prisma"
import { getServerSession } from "next-auth/next"
import authOptions from "@/app/lib/AuthProvider"

type RequestData = {
    province: string,
    emoji: string,
    name: string,
    description: string
}

export async function POST(request: Request){

    try {
        
        const session = await getServerSession(authOptions)
        const res:RequestData = await request.json()
        if(!session){
            return new Response( JSON.stringify({
                statusCode: 401,
                message: "กรุณาเข้าสู่ระบบก่อนดำเนินการ"
            }) , {
                status: 401
            })
        }
        else{
            const createVisitedProvince = await prisma.visitedProvince.create({
                data: {
                    province: res.province,
                    emoji: res.emoji,
                    name: res.name,
                    description: res.description,
                    ownerId: session.user.id
                }
            })

            if(createVisitedProvince){
                return new Response( JSON.stringify({
                    statusCode: 200,
                    data: createVisitedProvince
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
            message: error
        }) , {
            status: 400
        })
    }
    
}