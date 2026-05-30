'use client'

import Link from 'next/link'

import { CartItemCard } from '@/components/cart/cart-item-card'
import { CartSummary } from '@/components/cart/cart-summary'
import { AppShell } from '@/components/layout/app-shell'
import { useCart } from '@/contexts/cart-context'

export default function CartPage() {
  const { items, totals } = useCart()

  return (
    <AppShell>
      <div className="space-y-6">
        <section className="rounded-3xl bg-zinc-950 p-6 text-white shadow-sm sm:p-8">
          <div className="max-w-3xl">
            <span className="text-sm font-medium text-zinc-300">
              Carrinho de consulta
            </span>

            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Produtos selecionados
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-300 sm:text-base">
              Organize produtos para conferência de preço no cartão e à vista.
              Esta tela não finaliza compra.
            </p>
          </div>
        </section>

        {totals.totalItems === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-8 text-center shadow-sm">
            <h3 className="text-lg font-bold text-zinc-950">
              Seu carrinho está vazio
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
              Pesquise produtos e adicione itens para simular os valores.
            </p>

            <Link
              href="/products"
              className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-zinc-950 px-5 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              Buscar produtos
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <section className="space-y-4">
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