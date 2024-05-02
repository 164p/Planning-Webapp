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

        const resp = await fetch(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${planId}&key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}`)
        const blobFile = await resp.blob()
        const text = await blobFile.text()
        return new Response(await blobFile.text()) , {
            status: 200
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