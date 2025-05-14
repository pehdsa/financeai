import { clerkClient } from "@clerk/nextjs/server";
import { getCurrentMonthTransactions } from "../get-current-month-transactions";

export const canUserAddTransaction = async (userId: string) => {
  const user = (await clerkClient()).users.getUser(userId);
  if (!user) return false;

  if ((await user).publicMetadata.subscriptionPlan === "premium") return true;

  const currentMonthTransactions = await getCurrentMonthTransactions(userId);
  if (currentMonthTransactions < 10) return true;

  return false;
};
