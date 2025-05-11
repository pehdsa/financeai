import { TransactionType } from '@prisma/client';

export type TransactionPercentagePerType = {
    [key in TransactionType]: number;
}

export interface TotalExpensePerCategory {
    category: string;
    totalAmount: number;
    percentageOfTotal: number
}
