import { WalletIcon, PiggyBankIcon, TrendingUpIcon, TrendingDownIcon } from "lucide-react"

import { SummaryCard } from "@/app/(home)/_components/summary-card";
import { db } from "@/app/_lib/prisma"

interface SummaryCardsProps {
    month: string
}

export const SummaryCards = async ({ month }: SummaryCardsProps) => {

    const where = {
        date: {
            gte: new Date(`2025-${month}-01`),
            lt: new Date(`2025-${month}-31`),
        },
    }

    const depositTotal = Number((
        await db.transaction.aggregate({
            where: { ...where, type: "DEPOSIT" },
            _sum: { amount: true }
        })
    )?._sum?.amount);
    const investmentsTotal = Number((
        await db.transaction.aggregate({
            where: { ...where, type: "INVESTMENT" },
            _sum: { amount: true }
        })
    )?._sum?.amount);
    const expensesTotal = Number((
        await db.transaction.aggregate({
            where: { ...where, type: "EXPENSE" },
            _sum: { amount: true }
        })
    )?._sum?.amount);
    const balance = depositTotal - investmentsTotal - expensesTotal;


    return (
        <div className="space-y-6">
            {/* PRIMEIRO CARD */}
            <SummaryCard 
                icon={<WalletIcon size={16} />}
                title="Saldo"
                amount={balance}
                size="large"
            />

            {/* OUTROS CARDS */}
            <div className="grid grid-cols-3 gap-6">
                <SummaryCard 
                    icon={<PiggyBankIcon size={16} />}
                    title="Investido"
                    amount={investmentsTotal}
                />
                <SummaryCard 
                    icon={<TrendingUpIcon size={16} className="text-primary" />}
                    title="Receita"
                    amount={depositTotal}
                />
                <SummaryCard 
                    icon={<TrendingDownIcon size={16} className="text-red-500" />}
                    title="Despesas"
                    amount={expensesTotal}
                />
            </div>
        </div>
    );
}
 