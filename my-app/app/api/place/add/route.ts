import prisma from "@/app/lib/prisma"
import { getServerSession } from "next-auth/next"
import authOptions from "@/app/lib/AuthProvider"

export async function POST(request: Request){

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

        const res = await request.json()

        const placeData: any = res.placeData
        const planId: string | null | undefined  = res.planId
        const time: string | null | undefined = res.time

        if(!placeData || !planId){
            return new Response( JSON.stringify({
                statusCode: 400,
                message: 'ข้อมูลไม่ครบถ้วน'
            }) , {
                status: 400
            })
        }

        const createPlace = await prisma.place.create({
            data: {
                name: placeData.structured_formatting.main_text,
                googlePlaceId: placeData.place_id,
                planId: planId,
                time: time
            }
        })

        if(createPlace){
            return new Response( JSON.stringify({
                statusCode: 200,
                message: "Successful to add place"
            }) , {
                status: 200
            })
        }

        return new Response( JSON.stringify({
            statusCode: 500,
            message: 'Unknown error occurred.'
        }) , {
            status: 500
        })

    } catch (error) {
        return new Response( JSON.stringify({
            statusCode: 500,
            message: 'Unknown error occurred.'
        }) , {
            status: 500
        })
    }
    
}