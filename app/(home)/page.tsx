import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NavBar from "@/app/_components/navbar"
import { TimeSelect } from "@/app/(home)/_components/time-select"
import { SummaryCards } from "@/app/(home)/_components/summary-cards"
import { isMatch } from "date-fns"

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

    return (
        <>
        <NavBar />
        <div className="w-full h-full p-6 space-y-6">
            <div className="flex justify-between ">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <TimeSelect />
            </div>
            <SummaryCards month={ month } />
        </div>
        </>
    );
}
