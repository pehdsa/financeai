"use client";

import { useState } from "react";
import { UpsertTransactionDialog } from "@/app/_components/upsert-transaction.dialog";
import { Button } from "@/app/_components/ui/button";
import { ArrowDownUpIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface AddTransactionButtonProps {
  userCanAddTransaction: boolean;
}

export const AddTransactionButton = ({
  userCanAddTransaction,
}: AddTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="rounded-full font-bold"
            onClick={() => setDialogIsOpen(true)}
            disabled={!userCanAddTransaction}
          >
            Adicionar transação
            <ArrowDownUpIcon />
          </Button>
        </TooltipTrigger>
        {!userCanAddTransaction && (
          <TooltipContent>
            "Você atingiu o número de transações. Atualize seu plano agora
            mesmo."
          </TooltipContent>
        )}
      </Tooltip>
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      />
    </>
  );
};
