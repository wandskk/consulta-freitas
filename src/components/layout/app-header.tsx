'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useCart } from '@/contexts/cart-context'

export function AppHeader() {
    const pathname = usePathname()
    const { totals } = useCart()

    const isProductsPage = pathname === '/products'
    const isCartPage = pathname === '/cart'

    return (
        <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
                <Link href="/products" className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                        Consulta Freitas
                    </span>

                    <h1 className="truncate text-lg font-bold text-zinc-950">
                        Consulta de Produtos
                    </h1>
                </Link>

                <nav className="flex items-center gap-2">
                    <Link
                        href="/products"
                        className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${isProductsPage
                                ? 'bg-zinc-950 text-white'
                                : 'text-zinc-600 hover:bg-zinc-100'
                            }`}
                    >
                        Produtos
                    </Link>

                    <Link
                        href="/cart"
                        className={`relative rounded-xl px-3 py-2 text-sm font-semibold transition ${isCartPage
                                ? 'bg-zinc-950 text-white'
                                : 'text-zinc-600 hover:bg-zinc-100'
                            }`}
                    >
                        Carrinho

                        {totals.totalItems > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-600 px-1 text-[11px] font-bold text-white">
                                {totals.totalItems}
                            </span>
                        )}
                    </Link>
                </nav>
            </div>
        </header>
    )
}