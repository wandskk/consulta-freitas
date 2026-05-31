import type { ReactNode } from 'react'

import { BottomCartBar } from '@/components/cart/bottom-cart-bar'

import { AppFooter } from './app-footer'
import { AppHeader } from './app-header'

type AppShellProps = {
    children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
    return (
        <div className="flex min-h-screen flex-col bg-[#fff7f0] text-[#151515]">
            <AppHeader />

            <main className="flex-1 px-3 py-4 pb-32 sm:px-4 sm:py-8">
                <div className="mx-auto max-w-6xl">{children}</div>
            </main>

            <AppFooter />

            <BottomCartBar />
        </div>
    )
}
