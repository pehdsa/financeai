import NavBar from "@/app/_components/navbar";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardContent } from "@/app/_components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";
import { AcquirePlanButton } from "@/app/subscription/_components/acquire-plan-button";
import { Badge } from "../_components/ui/badge";
import { getCurrentMonthTransactions } from "../_data/get-current-month-transactions";

const SubscriptionPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const user = (await clerkClient()).users.getUser(userId);
  const currentMonthTransactions = await getCurrentMonthTransactions(userId);

  const hasPremiumPlan =
    (await user).publicMetadata.subscriptionPlan === "premium";

  return (
    <>
      <NavBar />
      <div className="p-6 space-y-6 flex flex-col grow overflow-hidden">
        <div className="flex w-full justify-between items-center">
          <h1 className="font-bold text-2xl">Transações</h1>
          {/* <AddTransactionButton /> */}
        </div>
        <div className="flex gap-6">
          <Card className="w-[450px]">
            <CardHeader className="border-b border-solid py-6">
              <h2 className="text-center text-2xl font-semibold">
                Plano Básico
              </h2>
              <div className="flex items-center gap-3 justify-center">
                <span className="text-4xl">R$</span>
                <span className="font-semibold text-6xl">0</span>
                <span className="text-2xl text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-3">
                <CheckIcon className="text-primary" />
                <p>
                  Apenas 10 transações por mês ({currentMonthTransactions}/10)
                </p>
              </div>
              <div className="flex items-center gap-3">
                <XIcon className="text-white" />
                <p>Relatórios de IA</p>
              </div>
            </CardContent>
          </Card>

          <Card className="w-[450px]">
            <CardHeader className="border-b border-solid py-6 relative">
              {hasPremiumPlan && (
                <Badge className="absolute left-4 top-0 rounded-full bg-primary/10 text-primary text-sm">
                  Ativo
                </Badge>
              )}
              <h2 className="text-center text-2xl font-semibold">
                Plano Premium
              </h2>
              <div className="flex items-center gap-3 justify-center">
                <span className="text-4xl">R$</span>
                <span className="font-semibold text-6xl">19</span>
                <span className="text-2xl text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-3">
                <CheckIcon className="text-primary" />
                <p>Transações ilimitadas</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon className="text-primary" />
                <p>Relatórios de IA</p>
              </div>
              <AcquirePlanButton />
            </CardContent>
          </Card>
        </div>
        {/* <ScrollArea className="">
                    <DataTable data={JSON.parse(JSON.stringify(transactions))} columns={transactionColumns} />
                </ScrollArea> */}
      </div>
    </>
  );
};

export default SubscriptionPage;
