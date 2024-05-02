import prisma from "@/app/lib/prisma"
import { getServerSession } from "next-auth/next"
import authOptions from "@/app/lib/AuthProvider"

export async function GET(request: Request){

    try {

        const session = await getServerSession(authOptions)

        if(!session){
            return new Response( JSON.stringify({
                statusCode: 401,
                message: "Access denied. Please log in to proceed."
            }) , {
                status: 401
            })
        }

        const planAllData = await prisma.plan.findMany({
            where: {
                ownerId: session.user.id
            }
        })

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
            message: 'Unknown error occurred.'
        }) , {
            status: 500
        })
    }

}