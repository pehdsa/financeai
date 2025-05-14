import { ReactNode } from "react";
import { Card, CardHeader, CardContent } from "@/app/_components/ui/card";
import { AddTransactionButton } from "@/app/_components/add-transaction-button";
import { canUserAddTransaction } from "@/app/_data/can-user-add-transaction";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
}

export const SummaryCard = async ({
  icon,
  title,
  amount,
  size = "small",
}: SummaryCardProps) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const userCanAddtransactions = await canUserAddTransaction(userId);

  return (
    <Card className={size === "small" ? "" : "bg-[#161716]"}>
      <CardHeader className="flex items-center gap-4">
        <div className="size-10 bg-white/[3%] rounded-md flex items-center justify-center">
          {icon}
        </div>
        <p
          className={
            size === "small" ? "text-muted-foreground" : "text-white opacity-70"
          }
        >
          {title}
        </p>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <p
          className={
            size === "small" ? "text-2xl font-bold" : "text-4xl font-bold"
          }
        >
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </p>

        {size === "large" && (
          <AddTransactionButton
            userCanAddTransaction={userCanAddtransactions}
          />
        )}
      </CardContent>
    </Card>
  );
};
