import { ScrollArea } from "@/app/_components/ui/scroll-area"
import { 
    CardHeader,
    CardTitle,
    CardContent
} from "@/app/_components/ui/card"
import { Progress } from "@/app/_components/ui/progress"
import { TotalExpensePerCategory } from "@/app/_data/get-dashboard/types"
import { TRANSACTION_CATEGORY_LABELS } from "@/app/_constants/transactions"

interface ExpensesPerCategoryProps {
    expensesPerCategory: TotalExpensePerCategory[]
}

export const ExpensesPerCategory = ({ expensesPerCategory }: ExpensesPerCategoryProps) => {
    return (
        <ScrollArea className="col-span-2 rounded-md border py-6 h-full">
            <CardHeader className="mb-6">
                <CardTitle className="font-bold">Gastos por categorias</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                { expensesPerCategory.map((category) => (
                    <div key={category.category} className="space-y-4">
                        <div className="flex justify-between w-full">
                            <p className="text-sm font-bold">{ TRANSACTION_CATEGORY_LABELS[category.category] }</p>
                            <p className="text-sm font-bold">{ category.percentageOfTotal }%</p>
                        </div>
                        <Progress value={category.percentageOfTotal} />
                    </div>
                )) }
            </CardContent>
        </ScrollArea>
    );
}
