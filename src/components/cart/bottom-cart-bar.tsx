'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useCart } from '@/contexts/cart-context'
import { formatCurrency } from '@/helpers/currency.helper'

export function BottomCartBar() {
  const pathname = usePathname()
  const { totals } = useCart()

  if (pathname === '/cart') {
    return null
  }

  if (totals.totalItems === 0) {
    return null
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200 bg-white/95 px-4 py-3 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <div className="min-w-0 flex-1">
          <span className="block text-xs font-medium text-zinc-500">
            Carrinho
          </span>

          <div className="flex flex-wrap items-center gap-x-2 text-sm">
            <strong className="text-zinc-950">
              {totals.totalItems} item{totals.totalItems === 1 ? '' : 's'}
            </strong>

            <span className="text-zinc-400">•</span>

            <span className="font-semibold text-zinc-950">
              {formatCurrency(totals.subtotalCard)}
            </span>
          </div>
        </div>

        <Link
          href="/cart"
          className="rounded-xl bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 active:scale-[0.98]"
        >
          Ver carrinho
        </Link>
      </div>
    </div>
  )
}