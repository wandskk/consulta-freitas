'use client'

import Link from 'next/link'

import { CartEmptyState } from '@/components/cart/cart-empty-state'
import { CartItemCard } from '@/components/cart/cart-item-card'
import { CartSummary } from '@/components/cart/cart-summary'
import { AppShell } from '@/components/layout/app-shell'
import { useCart } from '@/contexts/cart-context'

export default function CartPage() {
    const { items, totals } = useCart()

    return (
        <AppShell>
            <div className="space-y-4 sm:space-y-6">
                <Link
                    href="/products"
                    className="inline-flex items-center rounded-full bg-white px-3 py-2 text-sm font-black text-[#151515] shadow-sm ring-1 ring-[#ffd2c2] transition hover:bg-[#fff0e8] hover:text-[#c82f0d]"
                >
                    ← Voltar para produtos
                </Link>

                {totals.totalItems === 0 ? (
                    <CartEmptyState />
                ) : (
                    <div className="grid gap-4 lg:grid-cols-[1fr_360px] lg:gap-6">
                        <section className="space-y-3">
                            <div className="flex items-center justify-between rounded-2xl border border-[#ffd2c2] bg-white px-4 py-3 text-sm text-[#80665c] shadow-sm">
                                <span>
                                    <strong className="text-[#151515]">
                                        {totals.totalItems}
                                    </strong>{' '}
                                    item{totals.totalItems === 1 ? '' : 's'} no carrinho
                                </span>

                                <strong className="rounded-full bg-[#e43d16] px-3 py-1 text-xs font-black uppercase tracking-wide text-white">
                                    Carrinho
                                </strong>
                            </div>

                            {items.map((item) => (
                                <CartItemCard key={item.product.id} item={item} />
                            ))}
                        </section>

                        <CartSummary />
                    </div>
                )}
            </div>
        </AppShell>
    )
}
