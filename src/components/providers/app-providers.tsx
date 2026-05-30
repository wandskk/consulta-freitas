'use client'

import type { ReactNode } from 'react'

import { CartProvider } from '@/contexts/cart-context'

type AppProvidersProps = {
    children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
    return <CartProvider>{children}</CartProvider>
}