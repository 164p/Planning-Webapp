import prisma from "@/app/lib/prisma"
import bcrypt from 'bcrypt';
import { getServerSession } from "next-auth/next"
import authOptions from "@/app/lib/AuthProvider"


type RequestData = {
    newDisplayName:string
}

export async function POST(request:Request){

    try {

        const session = await getServerSession(authOptions)

        if(!session){
            return new Response(JSON.stringify({
                statusCode: 401,
                message:'Please login'
            }) , {
                status:401
            })
        }
        
        const res:RequestData = await request.json()

        const updateDisplayName = await prisma.user.update({
            where:{
                id:session.user.id,
            },
            data:{
                displayName:res.newDisplayName,
            }
        })

        if(updateDisplayName){
            return new Response(JSON.stringify({
                statusCode:200,
                message:res.newDisplayName
            }) , {
                status:200
            })
        }
        return new Response(JSON.stringify({
            statusCode:500,
            message:'some error'
        }) , {
            status: 500
        })
        

    } catch (error) {
        return new Response(JSON.stringify({
            statusCode:500,
            message:'some error'
        }) , {
            status: 500
        })
    } 
}    