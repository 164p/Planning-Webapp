import prisma from "@/app/lib/prisma"
import { getServerSession } from "next-auth/next"
import authOptions from "@/app/lib/AuthProvider"

export async function GET(request: Request) {
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

        const profileImage = await prisma.user.findUnique({
            where:{
                id: session.user.id
            }, 
            select:{
                profileimage: true,
            }
        })
        
        return new Response( JSON.stringify({
            statusCode: 200,
            data: profileImage
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