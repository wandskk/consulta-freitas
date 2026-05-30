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
            <div className="space-y-6">
                <div>
                    <Link
                        href="/products"
                        className="inline-flex items-center text-sm font-semibold text-zinc-600 transition hover:text-zinc-950"
                    >
                        ← Voltar para produtos
                    </Link>
                </div>

                {totals.totalItems === 0 ? (
                    <CartEmptyState />
                ) : (
                    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
                        <section className="space-y-4">
                            <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600 shadow-sm">
                                <strong className="text-zinc-950">
                                    {totals.totalItems} item{totals.totalItems === 1 ? '' : 's'}
                                </strong>{' '}
                                no carrinho. Os valores são atualizados automaticamente.
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