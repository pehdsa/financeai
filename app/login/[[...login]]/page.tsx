import Image from "next/image";
import { Button } from "@/app/_components/ui/button"
import { LogInIcon } from "lucide-react"
import { SignInButton } from '@clerk/nextjs'
import { SignIn } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { redirect } from "next/navigation"

const LoginPage = async () => {
    const { userId } = await auth()

    if (userId) {
        redirect("/")
    }

    return (
        <div className="grid grid-cols-2 h-full">
            <div className="flex flex-col justify-center p-8 max-w-[500px] mx-auto">
                <Image 
                    src="/logo.svg"
                    alt="Finance AI"
                    width={173}
                    height={39}
                    className="mb-8"
                />
                <h1 className="text-4xl font-bold mb-3">Bem-Vindo</h1>
                <p className="text-muted-foreground mb-8">A Finance AI é uma plataforma de gestão financeira que utiliza IA para monitorar suas movimentações, e oferecer insights personalizados, facilitando o controle do seu orçamento.</p>
                {/* <SignIn afterSignOutUrl="/login" /> */}
                <SignInButton>
                    <Button variant="outline">
                        <LogInIcon className="mr-2" />
                        Fazer login ou criar conta
                    </Button>
                </SignInButton>
            </div>
            <div className="relative h-full w-full">            
                <Image 
                    src="/login_image.png"
                    alt="Login Image"
                    className="object-cover"
                    fill
                />
            </div>
        </div>
    );
}
 
export default LoginPage;