import prisma from "@/app/lib/prisma"
import { getServerSession } from "next-auth/next"
import authOptions from "@/app/lib/AuthProvider"
import { planStatus } from "@prisma/client"

type RequestData = {
    
    images?: string,
    
}

export async function POST(request:Request) {
    
    try {
        const session = await getServerSession(authOptions)

        if(!session){
            return new Response( JSON.stringify({
                statusCode: 401,
                message: "Please login before."
            }) , {
                status: 401
            })
        }

        const res:RequestData = await request.json()
        if (res.images !== ''){

            const changeProfile = await prisma.user.update({
                where:{
                    id: session.user.id
                },
                data:{
                    profileimage:res.images
                }
            })
            if (changeProfile){
            return new Response( JSON.stringify({
                statusCode: 200,
                message: "Update data success."
            }) , {
                status: 200
            })
        }

        
        }else{
            return new Response( JSON.stringify({
                statusCode: 400,
                message: "Invalid input"
            }) , {
                status:400
            })
        }
    } catch (error) {
        console.log(error)
        return new Response( JSON.stringify({
            statusCode: 500,
            message: 'Update failed! please tryagain later.'
        }) , {
            status: 500
        })
    }
}