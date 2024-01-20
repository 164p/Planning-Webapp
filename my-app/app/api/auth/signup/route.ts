import prisma from "@/app/lib/prisma"
import bcrypt from 'bcrypt';

type RequestData = {
    username: string,
    password_1: string,
    password_2: string,
    email: string
}

export async function POST(request: Request){

    try {

        const usernameRegex = /^[a-zA-Z0-9]+$/;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        const res: RequestData = await request.json()

        if(!res.username || !res.password_1 || !res.password_2 || !res.email){
            return new Response( JSON.stringify({
                statusCode: 400,
                message: 'กรุณากรอกข้อมูลให้ครบถ้วน'
            }) , {
                status: 400
            })
        }

        if(!usernameRegex.test(res.username)){
            return new Response( JSON.stringify({
                statusCode: 400,
                message: 'ชื่อผู้ใช้งานจะต้องประกอบด้วย A-Z หรือ a-z หรือ 0-9'
            }) , {
                status: 400
            })
        }
        
        if(!res.email.match(emailRegex)){
            return new Response( JSON.stringify({
                statusCode: 400,
                message: 'อีเมลที่สมัครไม่ถูกต้อง'
            }) , {
                status: 400
            })
        }

        if(res.password_1 !== res.password_2){
            return new Response( JSON.stringify({
                statusCode: 400,
                message: 'รหัสผ่านทั้ง 2 ไม่ตรงกัน'
            }) , {
                status: 400
            })
        }

        if(res.password_1.length < 6){
            return new Response( JSON.stringify({
                statusCode: 400,
                message: 'รหัสผ่านจะต้องมีอย่างน้อย 6 ตัวอักษร'
            }) , {
                status: 400
            })
        }

        const countUser = await prisma.account.count({
            where: {
                OR: [
                    {
                        username: res.username
                    },
                    {
                        email: res.email
                    }
                ]
            }
        })

        if(countUser > 0){
            return new Response( JSON.stringify({
                statusCode: 400,
                message: 'ชื่อผู้ใช้งานหรืออีเมลนี้ถูกใช้งานแล้ว'
            }) , {
                status: 400
            })
        }else{
            let saltRounds = 10
            const hashPassword = bcrypt.hashSync(res.password_1, saltRounds)

            const createUser = await prisma.account.create({
                data: {
                    username: res.username,
                    password: hashPassword,
                    email: res.email
                }
            })

            if(createUser){
                return new Response( JSON.stringify({
                    statusCode: 200,
                    message: ''
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
        }

    } catch (error) {
        return new Response( JSON.stringify({
            statusCode: 400,
            message: 'เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้งในภายหลัง'
        }) , {
            status: 400
        })
    }
}