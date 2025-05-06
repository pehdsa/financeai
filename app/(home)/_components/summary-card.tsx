import { ReactNode } from "react"
import {
    Card,
    CardHeader,
    CardContent
} from "@/app/_components/ui/card"
import { AddTransactionButton } from "@/app/_components/add-transaction-button"

interface SummaryCardProps {
    icon: ReactNode,
    title: string,
    amount: number,
    size?: "small" | "large"
}

export const SummaryCard = ({ icon, title, amount, size = "small" }: SummaryCardProps) => {
    return (
        <Card className={size === 'small' ? "" : "bg-[#161716]"}>
            <CardHeader className="flex items-center gap-4">
                { icon }
                <p className={ size === "small" ? "text-muted-foreground" : "text-white opacity-70"}>{ title }</p>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
                <p className={ size === "small" ? "text-2xl font-bold" : "text-4xl font-bold"}>
                    { Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(amount) }
                </p>
                
                { size === "large" && <AddTransactionButton /> }

            </CardContent>
        </Card>
    );
}
