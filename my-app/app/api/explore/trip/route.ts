import prisma from "@/app/lib/prisma"
import { getServerSession } from "next-auth/next"
import authOptions from "@/app/lib/AuthProvider"

export async function GET(request: Request){

    try {
        const planAllData = await prisma.plan.findMany()

        return new Response( JSON.stringify({
            statusCode: 200,
            data: planAllData
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