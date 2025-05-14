"use client";

import { Button } from "@/app/_components/ui/button"
import { createStripeCheckout } from "@/app/subscription/_actions/creaate-checkout";
import { loadStripe } from "@stripe/stripe-js"

interface AcquirePlanButtonProps {
    onClick?: () => void;
}

export const AcquirePlanButton = () => {

    const handleAcquirePlanClick = async () => {
        const { sessionId } = await createStripeCheckout();
        if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
            throw new Error("Stripe publishable key not found");
        }
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

        if (!stripe) {
            throw new Error("Stripe not loaded");
        }

        await stripe.redirectToCheckout({ sessionId });
    }

    return <Button onClick={handleAcquirePlanClick} className="w-full rounded-full font-bold">Adquirir plano</Button>;
}
 