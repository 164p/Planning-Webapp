import prisma from "@/app/lib/prisma"
import { getServerSession } from "next-auth/next"
import authOptions from "@/app/lib/AuthProvider"
import { planStatus } from "@prisma/client"

type RequestData = {
    name?: string,
    budget?: string,
    startDate?: string,
    endDate?: string,
    images?: string,
    detail?: string,
    status?: planStatus,
}

export async function POST(
    request: Request,
    { params }: { params: { id: string } }){

    try {

        const session = await getServerSession(authOptions)

        const planId = params.id

        if(!session){
            return new Response( JSON.stringify({
                statusCode: 401,
                message: "Please login before."
            }) , {
                status: 401
            })
        }

        if(!planId){
            return new Response( JSON.stringify({
                statusCode: 400,
                message: "Your plan is not found."
            }) , {
                status: 400
            })
        }

        const planCount = await prisma.plan.count({
            where: {
                id: planId,
                ownerId: session.user.id
            }
        })

        if(planCount < 1){
            return new Response( JSON.stringify({
                statusCode: 400,
                message: 'Your plan is not found.'
            }) , {
                status: 400
            })
        }

        const res: RequestData = await request.json()

        if(!res.budget || !res.detail || !res.name || !res.startDate || !res.endDate){
            return new Response( JSON.stringify({
                statusCode: 400,
                message: 'Your plan is not found.'
            }) , {
                status: 400
            })
        }

        const updateDate = await prisma.plan.update({
            where: {
                id: planId
            },
            data: {
                name: res.name,
                detail: res.detail,
                budget: Number(res.budget),
                startDate: new Date(res.startDate),
                endDate: new Date(res.endDate),
                status: 'public'
            }
        })

        if(updateDate){
            return new Response( JSON.stringify({
                statusCode: 200,
                message: "Update data success."
            }) , {
                status: 200
            })
        }
        

    } catch (error) {

        console.log(error)
        return new Response( JSON.stringify({
            statusCode: 500,
            message: 'Update failed! please tryagain later.'
        }) , {
            status: 500
        })
        
    }
}