import prisma from "@/app/lib/prisma"
import { getServerSession } from "next-auth/next"
import authOptions from "@/app/lib/AuthProvider"

export async function GET(
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

        const url = new URL(request.url)
        const searchParams = new URLSearchParams(url.searchParams)
        const date = searchParams.get('date')

        if(!date){
            return new Response( JSON.stringify({
                statusCode: 400,
                message: "Data it not found"
            }) , {
                status: 400
            })      
        }

        const selectedDate = new Date(date)
        const selectedDay = selectedDate.getDate()
        const selectedYear = selectedDate.getFullYear()
        const selectedMonth = selectedDate.getMonth()
        const placeData = await prisma.place.findMany({
            where: {
                planId: planId,
                date: {
                    gte: new Date(`${selectedYear}-${selectedMonth+1}-${selectedDay} 00:00:00`),
                    lte: new Date(`${selectedYear}-${selectedMonth+1}-${selectedDay} 23:59:59`)
                }
            },
            include: {
                subPlace: true
            },
            orderBy: {
                time: 'asc'
            }
        }) 
        return new Response( JSON.stringify({
            statusCode: 200,
            data: placeData
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