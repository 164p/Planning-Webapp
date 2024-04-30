import prisma from "@/app/lib/prisma"
import { getServerSession } from "next-auth/next"
import authOptions from "@/app/lib/AuthProvider"

export async function POST(request: Request) {

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

        const addBookmark = await prisma.bookmark.create({
            data: {
                planId: res,
                ownerId: session.user.id
            }
        })
    

        if(addBookmark){
            return new Response( JSON.stringify({
                statusCode: 200,
                data: addBookmark
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

