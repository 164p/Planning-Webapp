import prisma from "@/app/lib/prisma"
import { getServerSession } from "next-auth/next"
import authOptions from "@/app/lib/AuthProvider"

export async function GET(request: Request) {
    
    try {
        const userData = await prisma.user.findMany({
            select:{
                id: true,
                username: true,
                email: true,
                createdAt: true
            }
        })

        return new Response(JSON.stringify({
            statusCode:200,
            data:userData
        }) , {
            status:200
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