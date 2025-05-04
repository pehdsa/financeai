import { Transaction, TransactionType } from "@prisma/client";
import { Badge } from "@/app/_components/ui/badge";
import { CircleIcon } from "lucide-react";

const TransactionTypeBadge = ({ transaction }: { transaction: Transaction }) => {
    
    if (transaction.type === TransactionType.DEPOSIT) {
        return (
            <Badge className="bg-primary/10 border-primary/40! text-primary rounded-full hover:bg-primary/10 font-bold">
                <CircleIcon className="fill-primary mr-1" size={8} />
                Depósito
            </Badge>
        );
    }

    if (transaction.type === TransactionType.EXPENSE) {
        return (
            <Badge className="bg-danger/10 border-danger/40! text-danger rounded-full font-bold hover:bg-danger/10">
                <CircleIcon className="fill-danger mr-1" size={8} />
                Despesa
            </Badge>
        );
    }

    return (
        <Badge className="bg-secondary/10 border-secondary/40! text-secondary rounded-full hover:bg-secondary/10 font-bold">
            <CircleIcon className="fill-secondary mr-1" size={8} />
            Investimento
        </Badge>
    );
    
}
 
export default TransactionTypeBadge;