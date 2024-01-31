import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/app/lib/prisma"

type RequestData = {
  startDate: Date,
  endDate: Date,
}

export const addDateRecord = async (startDate: Date, endDate: Date) => {
  return prisma.planAll.create({
    data: {
      name: 'test',  
      budget: 10000,
      images: 'img',
      startDate: startDate,
      endDate: endDate,
      ownerId: '65ba5b34500758d49aa3bb9a',
        },
  });
};

export const getAllDateRecords = async () => {
  return prisma.planAll.findMany();
};

export async function POST(request: Request) {

    try {
      const res: RequestData = await request.json()
      // console.log(res)
      await addDateRecord(res.startDate, res.endDate);
      return new Response( JSON.stringify({
        statusCode: 200,
        message: "success"
    }) , 
    {
        status: 200
    })
    } catch (error) {
      console.error('Error adding date record:', error);
      return new Response( JSON.stringify({
        statusCode: 200,
        message: "failed"
    }) , 
    {
        status: 200
    })
    }
  }

