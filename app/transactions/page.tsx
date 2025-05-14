import { db } from "@/app/_lib/prisma";
import { DataTable } from "@/app/_components/ui/data-table";
import { transactionColumns } from "@/app/transactions/_columns";
import { AddTransactionButton } from "@/app/_components/add-transaction-button";
import NavBar from "@/app/_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { getCurrentMonthTransactions } from "../_data/get-current-month-transactions";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";

const TransactionsPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
  });

  const userCanAddtransactions = await canUserAddTransaction(userId);

  return (
    <>
      <NavBar />
      <div className="p-6 space-y-6 flex flex-col grow overflow-hidden">
        <div className="flex w-full justify-between items-center">
          <h1 className="font-bold text-2xl">Transações</h1>
          <AddTransactionButton
            userCanAddTransaction={userCanAddtransactions}
          />
        </div>
        <ScrollArea className="">
          <DataTable
            data={JSON.parse(JSON.stringify(transactions))}
            columns={transactionColumns}
          />
        </ScrollArea>
      </div>
    </>
  );
};

export default TransactionsPage;
