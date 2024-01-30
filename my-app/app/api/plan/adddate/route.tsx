import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/app/lib/prisma"

export const addDateRecord = async (startDate: Date, endDate: Date) => {
  return prisma.dateRecord.create({
    data: {
      startDate,
      endDate,
    },
  });
};

export const getAllDateRecords = async () => {
  return prisma.dateRecord.findMany();
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { startDate, endDate } = req.body;

    try {
      await addDateRecord(new Date(startDate), new Date(endDate));
      res.status(200).json({ success: true, message: 'Date record added to MongoDB!' });
    } catch (error) {
      console.error('Error adding date record:', error);
      res.status(500).json({ success: false, message: 'Failed to add date record to MongoDB' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
