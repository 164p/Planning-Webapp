import prisma from "@/app/lib/prisma"
import { getServerSession } from "next-auth/next"
import authOptions from "@/app/lib/AuthProvider"
import { planStatus } from "@prisma/client"

type RequestData = {
    name?: string,
    budget?: number,
    images?: string,
    detail?: string,
    status?: planStatus,
}

export async function POST(
    request: Request,
    { params }: { params: { id: string } }){

    try {

        const session = await getServerSession(authOptions)

        const planId = params.id

        if(!session){
            return new Response( JSON.stringify({
                statusCode: 401,
                message: "กรุณาเข้าสู่ระบบก่อนดำเนินการ"
            }) , {
                status: 401
            })
        }

        if(!planId){
            return new Response( JSON.stringify({
                statusCode: 400,
                message: "ไม่พบรายการที่ต้องการ"
            }) , {
                status: 400
            })
        }

        const planCount = await prisma.plan.count({
            where: {
                id: planId,
                ownerId: session.user.id
            }
        })

        if(planCount < 1){
            return new Response( JSON.stringify({
                statusCode: 400,
                message: 'ไม่พบรายการที่ต้องการ'
            }) , {
                status: 400
            })
        }

        const res:RequestData = await request.json()

        // return new Response( JSON.stringify({
        //     statusCode: 200,
        //     data: planData
        // }) , {
        //     status: 200
        // })

    } catch (error) {

        console.log(error)
        return new Response( JSON.stringify({
            statusCode: 500,
            message: 'เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้ง'
        }) , {
            status: 500
        })
        
    }
}