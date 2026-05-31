'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useCart } from '@/contexts/cart-context'

export function AppHeader() {
    const pathname = usePathname()
    const { totals } = useCart()

    const isCartPage = pathname === '/cart'

    return (
        <header className="sticky top-0 z-40 border-b border-[#ffd2c2] bg-white/95 shadow-[0_8px_24px_rgba(191,54,12,0.08)] backdrop-blur">
            <div className="h-1 bg-[#e43d16]" />

            <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-3 sm:px-4">
                <Link href="/products" className="min-w-0">
                    <span className="block text-[10px] font-black uppercase tracking-[0.24em] text-[#e43d16]">
                        Consulta Freitas
                    </span>

                    <h1 className="truncate text-base font-black text-[#151515] sm:text-lg">
                        Consulta de Produtos
                    </h1>
                </Link>

                <nav className="flex items-center gap-2">
                    <Link
                        href="/cart"
                        className={`relative rounded-xl px-3 py-2 text-sm font-black transition ${isCartPage
                            ? 'bg-[#e43d16] text-white shadow-[0_8px_18px_rgba(228,61,22,0.28)]'
                            : 'bg-[#fff0e8] text-[#151515] hover:bg-[#ffe0d4]'
                            }`}
                    >
                        Carrinho

                        {totals.totalItems > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#151515] px-1 text-[11px] font-black text-white ring-2 ring-white">
                                {totals.totalItems}
                            </span>
                        )}
                    </Link>
                </nav>
            </div>
        </header>
    )
}
