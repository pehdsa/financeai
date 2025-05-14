"use client"

import { Pie, PieChart } from "recharts"
import { TransactionType } from "@prisma/client"
import { TransactionPercentagePerType } from "@/app/_data/get-dashboard/types"
import { TrendingUpIcon, TrendingDownIcon, PiggyBankIcon } from "lucide-react"
import { PercentageItem } from "@/app/(home)/_components/percentage-item"

import {
  Card,
  CardContent,
} from "@/app/_components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart"

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Investido",
    color: "#FFF"
  },
  [TransactionType.DEPOSIT]: {
    label: "Receita",
    color: "#55802E"
  },
  [TransactionType.EXPENSE]: {
    label: "Despesas",
    color: "#E93030"
  }
} satisfies ChartConfig

interface TransactionsPieChartProps {
    dashboard: {
        balance: number,
        depositTotal: number,
        investmentsTotal: number,
        expensesTotal: number,
        typesPercentage: TransactionPercentagePerType
    }
} 

export function TransactionsPieChart({ dashboard }: TransactionsPieChartProps) {

    const chartData = [
        { 
            type: TransactionType.DEPOSIT ,
            amount: dashboard.depositTotal,
            fill: "#55802E",
        },
        { 
            type: TransactionType.EXPENSE ,
            amount: dashboard.expensesTotal,
            fill: "#E93030",
        },
        { 
            type: TransactionType.INVESTMENT ,
            amount: dashboard.investmentsTotal,
            fill: "#FFF",
        }
    ]

    return (
        <Card className="flex flex-col p-4">
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[200px]"
                >
                    <PieChart>
                        <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="amount"
                            nameKey="type"
                            innerRadius={60}
                        />
                    </PieChart>
                </ChartContainer>

                <div className="space-y-3">

                    <PercentageItem 
                        icon={<TrendingUpIcon size={16} className="text-primary" />}
                        title="Receita"
                        value={ dashboard.typesPercentage[TransactionType.DEPOSIT] }
                    />

                    <PercentageItem 
                        icon={<TrendingDownIcon size={16} className="text-red-500" />}
                        title="Despesa"
                        value={ dashboard.typesPercentage[TransactionType.EXPENSE] }
                    />

                    <PercentageItem 
                        icon={<PiggyBankIcon size={16} />}
                        title="Investimento"
                        value={ dashboard.typesPercentage[TransactionType.INVESTMENT] }
                    />
                    
                </div>

            </CardContent>
        </Card>
    )
}
