import prisma from "@/app/lib/prisma"
import { getServerSession } from "next-auth/next"
import authOptions from "@/app/lib/AuthProvider"

export async function GET(request: Request){

    const session = await getServerSession(authOptions)

    try {
        const bookmarkData = await prisma.bookmark.findMany(
            {
                where: { ownerId: session.user.id },
                select:{
                    id:true,
                    plan:true,
                    
                }
            }
        )

        return new Response( JSON.stringify({
            statusCode: 200,
            data: bookmarkData
        }) , {
            status: 200
        })

    } catch (error) {

        console.log(error)
        return new Response( JSON.stringify({
            statusCode: 500,
            message: error
        }) , {
            status: 500
        })
    }

}