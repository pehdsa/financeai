import { db } from "@/app/_lib/prisma";
import { DataTable } from "@/app/_components/ui/data-table"
import { transactionColumns } from "@/app/transactions/_columns";
import { AddTransactionButton } from "@/app/_components/add-transaction-button"
import NavBar from "@/app/_components/navbar"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
  
const TransactionsPage = async () => {
    const { userId } = await auth();
    if (!userId) {
        redirect("/login");
    }

    const transactions = await db.transaction.findMany({
        where: {
            userId
        }
    });

    return (
        <>
        <NavBar />
        <div className="p-6 space-y-6">
            <div className="flex w-full justify-between items-center">
                <h1 className="font-bold text-2xl">Transações</h1>
                <AddTransactionButton />
            </div>
            <DataTable data={JSON.parse(JSON.stringify(transactions))} columns={transactionColumns} />
        </div>
        </>
    );
}
 
export default TransactionsPage;