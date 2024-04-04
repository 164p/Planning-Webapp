import prisma from "@/app/lib/prisma"
import { getServerSession } from "next-auth/next"
import authOptions from "@/app/lib/AuthProvider"

export async function GET(
    request: Request,
    { params }: { params: { id: string } }){

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

    const planData = await prisma.plan.findUnique({
        where: {
            id: planId,
            ownerId: session.user.id
        }
    })

    return new Response( JSON.stringify({
        statusCode: 200,
        data: planData
    }) , {
        status: 200
    })

}