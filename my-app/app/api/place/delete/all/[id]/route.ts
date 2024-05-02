import prisma from "@/app/lib/prisma"
import { getServerSession } from "next-auth/next"
import authOptions from "@/app/lib/AuthProvider"

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }){

    try {

        const session = await getServerSession(authOptions)

        const planId = params.id

        if(!session){
            return new Response( JSON.stringify({
                statusCode: 401,
                message: "Access denied. Please log in to proceed."
            }) , {
                status: 401
            })
        }

        if(!planId || planId.length < 24){
            return new Response( JSON.stringify({
                statusCode: 400,
                message: "Data it not found"
            }) , {
                status: 400
            })
        }

        const deletePlace = await prisma.place.deleteMany({
            where: {
                planId: planId
            }
        })

        if(deletePlace){
            return new Response( JSON.stringify({
                statusCode: 200,
                message: 'Successful to delete data'
            }) , {
                status: 200
            })
        }

        
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