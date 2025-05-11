import { WalletIcon, PiggyBankIcon, TrendingUpIcon, TrendingDownIcon } from "lucide-react"

import { SummaryCard } from "@/app/(home)/_components/summary-card";
import { db } from "@/app/_lib/prisma"

interface SummaryCardsProps {
    dashboard: {
        balance: number,
        depositTotal: number,
        investmentsTotal: number,
        expensesTotal: number    
    }
}   

export const SummaryCards = async ({ dashboard }: SummaryCardsProps) => {

    return (
        <div className="space-y-6">
            {/* PRIMEIRO CARD */}
            <SummaryCard 
                icon={<WalletIcon size={16} />}
                title="Saldo"
                amount={dashboard.balance}
                size="large"
            />

            {/* OUTROS CARDS */}
            <div className="grid grid-cols-3 gap-6">
                <SummaryCard 
                    icon={<PiggyBankIcon size={16} />}
                    title="Investido"
                    amount={dashboard.investmentsTotal}
                />
                <SummaryCard 
                    icon={<TrendingUpIcon size={16} className="text-primary" />}
                    title="Receita"
                    amount={dashboard.depositTotal}
                />
                <SummaryCard 
                    icon={<TrendingDownIcon size={16} className="text-red-500" />}
                    title="Despesas"
                    amount={dashboard.expensesTotal}
                />
            </div>
        </div>
    );
}
 