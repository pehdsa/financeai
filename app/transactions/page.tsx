import { db } from "@/app/_lib/prisma";
import { Button } from "@/app/_components/ui/button";
import {ArrowDownUpIcon} from "lucide-react";
import { DataTable } from "@/app/_components/ui/data-table"
import { transactionColumns } from "@/app/transactions/_columns"
  
const TransactionsPage = async () => {
    const transactions = await db.transaction.findMany({});
    console.log(transactions)
    return (
        <div className="p-6 space-y-6">
            <div className="flex w-full justify-between items-center">
                <h1 className="font-bold text-2xl">Transações</h1>
                <Button className="rounded-full">
                    Adicionar transação
                    <ArrowDownUpIcon />
                </Button>
            </div>
            <DataTable data={transactions} columns={transactionColumns} />
        </div>
    );
}
 
export default TransactionsPage;