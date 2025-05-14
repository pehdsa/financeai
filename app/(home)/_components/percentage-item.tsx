import { ReactNode } from "react"

interface PercentageItemProps {
    icon: ReactNode,
    title: string,
    value: number
}

export const PercentageItem = ({ icon, title, value }: PercentageItemProps) => {
    return (
        <div className="flex justify-between items-center">                        
            <div className="flex items-center gap-2">
                <div className="size-10 bg-white/[3%] rounded-md flex items-center justify-center">
                    { icon }
                </div>
                <p className="text-sm text-muted-foreground">{ title }</p>
            </div>
            <p className="font-bold text-sm">{ value }%</p>
        </div>
    );
}
