import { ScrollArea } from "@/app/_components/ui/scroll-area"
import { 
    CardHeader,
    CardTitle,
    CardContent
} from "@/app/_components/ui/card"
import { Button } from "@/app/_components/ui/button"
import Link from "next/link"
import Image from "next/image";

import { Transaction, TransactionType } from "@prisma/client"
import { formatCurrency } from "@/app/_utils/currency"
import { TRANSACTION_PAYMENT_METHOD_ICONS } from "@/app/_constants/transactions"

interface LastTransactionsProps {
    lastTransactions: Transaction[]
}

export const LastTransactions = ({ lastTransactions }: LastTransactionsProps) => {

    const getAmountColor = (transaction: Transaction) => {
        if (transaction.type === TransactionType.EXPENSE) {
            return "text-red-500"
        }
        if (transaction.type === TransactionType.INVESTMENT) {
            return "text-white"
        }
        if (transaction.type === TransactionType.DEPOSIT) {
            return "text-primary"
        }
    }

    return (
        <ScrollArea className="rounded-md border py-6 min-h-full">
            <CardHeader className="flex items-center justify-between mb-4">
                <CardTitle>Últimas Transações</CardTitle>
                <Button variant="outline" className="rounded-full font-bold" asChild>
                    <Link href="/transactions">Ver Mais</Link>
                </Button>
            </CardHeader>
            <CardContent className="space-y-6">
                { lastTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="size-10 flex items-center justify-center bg-white/[3%] rounded-md">
                                <Image src={ TRANSACTION_PAYMENT_METHOD_ICONS[transaction.paymentMethod] } height={20} width={20} alt="Pix"/>
                            </div>
                            <div>
                                <p className="text-sm font-bold">{ transaction.name }</p>
                                <p className="text-sm text-muted-foreground">{ new Date(transaction.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" }) }</p>
                            </div>
                        </div>
                        <div>
                            <p className={`text-sm font-bold ${ getAmountColor(transaction) }`}>
                                { transaction.type === TransactionType.DEPOSIT ? "+" : "-" } { formatCurrency(Number(transaction.amount))}
                            </p>
                        </div>
                    </div>
                )) }
            </CardContent>
        </ScrollArea>
    );
}
 
