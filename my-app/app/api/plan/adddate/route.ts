import prisma from "@/app/lib/prisma"

type RequestData = {
    startDate: Date,
    endDate: Date,
}

export async function POST(request: Request){

    try {

        const res: RequestData = await request.json()

        if(!res.startDate || !res.endDate){
            return new Response( JSON.stringify({
                statusCode: 400,
                message: 'กรุณากรอกข้อมูลให้ครบถ้วน'
            }) , {
                status: 400
            })
        }

        const createData = await prisma.planAll.create({
            data: {
                name: 'test',  
                budget: 10000,
                images: 'img',
                startDate: res.startDate,
                endDate: res.endDate,
                ownerId: '65ba5b34500758d49aa3bb9a',
            }
        })

        if(createData){
            return new Response( JSON.stringify({
                statusCode: 200,
            }) , {
                status: 200
            })
        }
        
        return new Response( JSON.stringify({
            statusCode: 400,
            message: 'เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้งในภายหลัง'
        }) , {
            status: 400
        })

    } catch (error) {
        return new Response( JSON.stringify({
            statusCode: 400,
            message: 'เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้งในภายหลัง'
        }) , {
            status: 400
        })
    }
    
}