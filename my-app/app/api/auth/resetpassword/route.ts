import prisma from "@/app/lib/prisma"
import bcrypt from 'bcrypt';
import { getServerSession } from "next-auth/next"
import authOptions from "@/app/lib/AuthProvider"
import Swal from "sweetalert2";


type RequestData = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
}

export async function POST(request:Request) {
    
    try {
        const res:RequestData = await request.json()

        const session = await getServerSession(authOptions)

        if(!session){
            return new Response(JSON.stringify({
                statusCode: 401,
                message:'Please login'
            }) , {
                status:401
            })
        }

        if(res.newPassword.length < 6 || res.newPassword !== res.confirmNewPassword){
            return new Response(JSON.stringify({
                statusCode:401,
                message:'Incorrect form'
            }) , {
                status:401
            })
        }


        const checkData = await prisma.user.findUnique({
            where:{
                id:session.user.id
            }
        })

        const CheckPassword = await bcrypt.compare(res.oldPassword,checkData.password)

        if(CheckPassword){
            let saltRounds = 10
            const hashPassword = bcrypt.hashSync(res.newPassword, saltRounds)
            const userData = await prisma.user.update({
                where:{
                    id:session.user.id
                },
                data:{
                    password:hashPassword
                }
            })
            return new Response( JSON.stringify({
                statusCode:200,
                message:'password changed'
            }) , {
                status:200
            })

        }else{

                return new Response( JSON.stringify({
                    statusCode:500,
                    message:'รหัสผ่านผิด'
                }) , {
                    status:500
            })
        }


    } catch (error) {
        return new Response( JSON.stringify({
            statusCode:500,
            message:'error'
        }) , {
            status:500
        })
    }
}