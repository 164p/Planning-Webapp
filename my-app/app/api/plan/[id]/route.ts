import prisma from "@/app/lib/prisma"
import { getServerSession } from "next-auth/next"
import authOptions from "@/app/lib/AuthProvider"

export async function GET(
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

        if(!planId || planId.length < 24){
            return new Response( JSON.stringify({
                statusCode: 400,
                message: "ไม่พบรายการที่ต้องการ"
            }) , {
                status: 400
            })
        }

        const planData = await prisma.plan.findUnique({
            where: {
                id: planId,
                ownerId: session.user.id
            },
            select: {
                id: false,
                name: true,
                budget: true,
                detail: true,
                images: true,
                startDate: true,
                endDate: true,
                status: true
            }
        })

        return new Response( JSON.stringify({
            statusCode: 200,
            data: planData
        }) , {
            status: 200
        })
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