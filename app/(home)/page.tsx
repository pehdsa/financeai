import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NavBar from "@/app/_components/navbar"
import { TimeSelect } from "@/app/(home)/_components/time-select"
import { SummaryCards } from "@/app/(home)/_components/summary-cards"
import { TransactionsPieChart } from "@/app/(home)/_components/transactions-pie-chart"
import { isMatch } from "date-fns"
import { getDshboard } from "@/app/_data/get-dashboard"
import { ExpensesPerCategory } from "@/app/(home)/_components/expenses-per-category"
import { LastTransactions } from "@/app/(home)/_components/last-transactions"

interface HomeProps {
    searchParams: {
        month: string
    }
}

export default async function Home({ searchParams: { month } }: HomeProps) {
    // const month = (await searchParams).month;
    const { userId } = await auth();

    if (!userId) {
        redirect("/login");
    }

    const monthIsInvalid = !month || !isMatch(month, "MM");
    if (monthIsInvalid) {
        redirect("/?month=01")
    }

    const dashboard = await getDshboard(month);

    return (
        <>
        <NavBar />
        <div className="p-6 space-y-6">
            <div className="flex justify-between ">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <TimeSelect />
            </div>
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                    <SummaryCards dashboard={ dashboard } />
                    <div className="grid grid-cols-3 grid-rows-1 gap-6">
                        <div>
                            <TransactionsPieChart dashboard={ dashboard } />
                        </div>
                        <ExpensesPerCategory expensesPerCategory={ dashboard.totalExpensePerCategory } />
                    </div>
                </div>
                <div>
                    <LastTransactions lastTransactions={ dashboard.lastTransactions } />
                </div>
            </div>
        </div>
        </>
    );
}
