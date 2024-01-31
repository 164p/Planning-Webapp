import prisma from "@/app/lib/prisma"
import bcrypt from 'bcrypt';

type RequestData = {
    username: string,
    password: string,
}

export async function POST(request: Request) {

    try {

        const res: RequestData = await request.json()

        if(!res.username || !res.password){
            return new Response( JSON.stringify({
                statusCode: 400,
                message: 'กรุณากรอกข้อมูลให้ครบถ้วน'
            }) , {
                status: 400
            })
        }

        const checkData = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        username: res.username
                    },
                    {
                        email: res.username
                    }
                ]
            }
        })

        if(checkData.length < 1){
            return new Response( JSON.stringify({
                statusCode: 400,
                message: 'ชื่อผู้ใช้หรือรหัสผ่านผิด'
            }) , {
                status: 400
            })
        }

        const CheckPassword = await bcrypt.compare(res.password, checkData[0].password);

        if(CheckPassword){

            const userData = await prisma.user.findUnique({
                where: {
                    username: res.username
                },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    role: true
                }
            })

            return new Response( JSON.stringify({
                statusCode: 200,
                data: userData
            }) , {
                status: 200
            })

        }

        return new Response( JSON.stringify({
            statusCode: 400,
            message: 'ชื่อผู้ใช้หรือรหัสผ่านผิด'
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