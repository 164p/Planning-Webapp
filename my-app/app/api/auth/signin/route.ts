type RequestData = {
    username: string,
    password: string,
}
export async function POST(request: Request) {
    const res: RequestData = await request.json()
    console.log(res)
    return Response.json({ res })
}