import prisma from "@/app/lib/prisma"
import { getServerSession } from "next-auth/next"
import authOptions from "@/app/lib/AuthProvider"

type RequestData = {
    id:string,
    username:string,
    email:string
}

export async function DELETE(request: Request) {
    try {
        const res: RequestData = await request.json();
        const deleteUser = await prisma.user.delete({
            where: {
                id: res.id
            },
            include:{
                plan:true
            }
        });

        if (deleteUser) {
            return new Response(JSON.stringify({
                statusCode: 200,
                message: "ลบข้อมูลเรียบร้อยแล้ว"
            }), {
                status: 200
            });
        }

        return new Response(JSON.stringify({
            statusCode: 400,
            message: "เกิดข้อผิดพลาดในการลบข้อมูล"
        }), {
            status: 400
        });
        
    } catch (error:any) {
        return new Response(JSON.stringify({
            statusCode: 400,
            message: error.toString()
        }), {
            status: 400
        });
    }
}