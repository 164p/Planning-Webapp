import prisma from "@/app/lib/prisma"
import { getServerSession } from "next-auth/next"
import authOptions from "@/app/lib/AuthProvider"



export async function DELETE(request: Request) {
    try {
        const res = await request.json();
        
        const deleteBookmark = await prisma.bookmark.delete({
           where:{
                id:res
           }
        });

        if (deleteBookmark) {
            return new Response(JSON.stringify({
                statusCode: 200,
                message: "ลบข้อมูลเรียบร้อยแล้ว",
                data:res
            }), {
                status: 200
            });
        }

        return new Response(JSON.stringify({
            statusCode: 400,
            message: "เกิดข้อผิดพลาดในการลบข้อมูล",
            data:res
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