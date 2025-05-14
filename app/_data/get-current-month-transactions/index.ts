import { db } from "@/app/_lib/prisma";
import { startOfMonth, endOfMonth } from "date-fns";

export const getCurrentMonthTransactions = async (userId: string) => {
  return await db.transaction.count({
    where: {
      userId,
      createdAt: {
        gte: startOfMonth(new Date()),
        lt: endOfMonth(new Date()),
      },
    },
  });
};
