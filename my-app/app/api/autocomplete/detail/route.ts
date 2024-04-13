import { type NextRequest } from 'next/server'


export async function GET(request: NextRequest) {

    try {
        const searchParams = request.nextUrl.searchParams
        const query = searchParams.get('query')

        if (query) {
            const res = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&components=country:th&key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}`)
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