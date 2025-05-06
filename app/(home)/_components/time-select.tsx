"use client"

import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/app/_components/ui/select"
import { useRouter, useSearchParams } from "next/navigation";

const MONTH_OPTIONS = [
    {  value: "01", label: "Janeiro" },
    {  value: "02", label: "Fevereiro" },
    {  value: "03", label: "Março" },
    {  value: "04", label: "Abril" },
    {  value: "05", label: "Maio" },
    {  value: "06", label: "Junho" },
    {  value: "07", label: "Julho" },
    {  value: "08", label: "Agosto" },
    {  value: "09", label: "Setembro" },
    {  value: "10", label: "Outubro" },
    {  value: "11", label: "Novembro" },
    {  value: "12", label: "Dezembro" },
]

export const TimeSelect = () => {
    const { push } = useRouter();
    const searchParams = useSearchParams();

    const month = searchParams.get("month")

    const handleMonthChange = (month: string) => {
        push(`/?month=${ month }`)
    }

    return (
        <Select onValueChange={(value) => handleMonthChange(value)} defaultValue={month ?? ""}>
            <SelectTrigger className="w-[150px] rounded-full">
                <SelectValue placeholder="Mês" />
            </SelectTrigger>
            <SelectContent className="bg-background">
                { MONTH_OPTIONS.map(item => {
                    return <SelectItem key={item.value} value={ item.value.toString() }>{ item.label }</SelectItem>
                }) }
            </SelectContent>
        </Select>
    );
}
