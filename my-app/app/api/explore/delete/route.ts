import prisma from "@/app/lib/prisma"
import { getServerSession } from "next-auth/next"
import authOptions from "@/app/lib/AuthProvider"


export async function DELETE(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return new Response(JSON.stringify({
                statusCode: 401,
                message: "กรุณาเข้าสู่ระบบก่อนดำเนินการ"
            }), {
                status: 401
            });
        } else {
            const res = await request.json();
            const deleteVisitedProvince = await prisma.place.delete({
                where: {
                    id: res
                }
            });

            if (deleteVisitedProvince) {
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
        }
    } catch (error:any) {
        return new Response(JSON.stringify({
            statusCode: 400,
            message: error.toString()
        }), {
            status: 400
        });
    }
}