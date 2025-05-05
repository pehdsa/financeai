"use client"

import { TransactionType, TransactionCategory, TransactionPaymentMethod } from "@prisma/client";
import { Button } from "@/app/_components/ui/button";
import {ArrowDownUpIcon} from "lucide-react";
import {
    TRANSACTION_CATEGORY_OPTIONS,
    TRANSACTION_PAYMENT_METHOD_OPTIONS,
    TRANSACTION_TYPE_OPTIONS
} from "@/app/_constants/transactions";
import {
    DialogTrigger,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
    DialogOverlay
} from "@/app/_components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/_components/ui/form"
import { Input } from "@/app/_components/ui/input"
import { MoneyInput } from "@/app/_components/money-input";
import { DatePicker } from "@/app/_components/ui/date-picker";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/app/_components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
    name: z.string().trim().min(1, {
        message: "O nome é obrigatório"
    }),
    amount: z.string().trim().min(1, {
        message: "O valor é obrigatório"
    }),
    type: z.nativeEnum(TransactionType, {
        required_error: "O tipo é obrigatório"
    }),
    category: z.nativeEnum(TransactionCategory, {
        required_error: "A categoria é obrigatória"
    }),
    paymentMethod: z.nativeEnum(TransactionPaymentMethod, {
        required_error: "O método de pagamento é obrigatório"
    }),
    date: z.date({
        required_error: "A data é obrigadtória"
    })
})

type FormSchema = z.infer<typeof formSchema>


export const AddTransactionButton = () => {

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            amount: "",
            category: TransactionCategory.OTHER,
            date: new Date(),
            paymentMethod: TransactionPaymentMethod.OTHER,
            type: TransactionType.DEPOSIT
        }
    })

    const onSubmit = (data: FormSchema) => {
        console.log(data);
    }

    return (  
        <Dialog onOpenChange={(open) => {
            if (!open) {
                form.reset();
            }
        }}>
            <DialogTrigger asChild>
                <Button className="rounded-full font-bold">
                    Adicionar transação
                    <ArrowDownUpIcon />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar Transação</DialogTitle>
                    <DialogDescription>Insita as informações abaixo</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome da transação</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite o nome" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Valor</FormLabel>
                                    <FormControl>
                                        <MoneyInput placeholder="Digite o valor" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem className="relative">
                                    <FormLabel>Tipo</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl className="w-full">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a verified email to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-background">
                                        {TRANSACTION_TYPE_OPTIONS.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Categoria</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl className="w-full">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione a categoria..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-background">
                                            {TRANSACTION_CATEGORY_OPTIONS.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="paymentMethod"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Método de pagamento</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl className="w-full">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione um método de pagamento..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-background">
                                            {TRANSACTION_PAYMENT_METHOD_OPTIONS.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Data</FormLabel>
                                    <DatePicker value={field.value} onChange={field.onChange} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="relative z-40">
                            <DialogClose asChild>
                                <Button variant="outline" type="button">Cancelar</Button>
                            </DialogClose>
                            <Button variant="default" type="submit">Adicionar</Button>
                        </DialogFooter>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    );
}
 