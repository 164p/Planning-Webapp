import { type NextRequest } from 'next/server'


export async function GET(request: NextRequest) {

    try {
        const searchParams = request.nextUrl.searchParams
        const query = searchParams.get('location')
        const types = searchParams.get('type')

        if (query) {
            const res = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${query}&components=country:th&radius=1500&type=${types}&key=${process.env.NEXT_MAPS_API_KEY}`)
            const data = await res.json()

            return new Response( JSON.stringify({
                statusCode: 200,
                data: data
            })  
            )
        }
        return new Response( JSON.stringify({
            statusCode: 200,
            data: ""
        }) , {
            status: 200
        })

    } catch (error) {
        console.log(error)
    }
    
    
  }