"use client"

import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation"

const NavBar = () => {
    const pathName = usePathname();

    return ( 
        <header className="flex justify-between items-center px-8 py-4 border-b border-solid">
            <div className="flex items-center gap-10">
                <Image 
                    src="/logo.svg"
                    alt="FinanceAi"
                    width={173}
                    height={39}
                />
                <nav className="flex justify-between gap-10">
                    <Link href="/" className={ pathName === '/' ? 'text-primary font-bold' : "text-muted-foreground" }>Dashboard</Link>
                    <Link href="/transactions" className={ pathName === '/transactions' ? 'text-primary font-bold' : "text-muted-foreground" }>Trasações</Link>
                    <Link href="/subscription" className={ pathName === '/subscription' ? 'text-primary font-bold' : "text-muted-foreground" }>Assinatura</Link>
                </nav>
            </div>
            <div>
                <UserButton showName />
            </div>
        </header>
    );
}
 
export default NavBar;