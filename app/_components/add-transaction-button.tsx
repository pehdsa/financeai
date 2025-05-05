"use client"

import { useState } from "react"
import { UpsertTransactionDialog } from "@/app/_components/upsert-transaction.dialog"
import { Button } from "@/app/_components/ui/button";
import {ArrowDownUpIcon} from "lucide-react";

export const AddTransactionButton = () => {

    const [dialogIsOpen, setDialogIsOpen] = useState(false)

    return (  
        <>
            <Button className="rounded-full font-bold" onClick={() => setDialogIsOpen(true)}>
                Adicionar transação
                <ArrowDownUpIcon />
            </Button>
            <UpsertTransactionDialog 
                isOpen={dialogIsOpen} 
                setIsOpen={setDialogIsOpen} 
            />
        </>
    );
}
 