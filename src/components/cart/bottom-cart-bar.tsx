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
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#ffd2c2] bg-white/95 px-3 py-3 shadow-[0_-10px_30px_rgba(191,54,12,0.14)] backdrop-blur sm:px-4">
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <div className="min-w-0 flex-1">
          <span className="block text-xs font-black uppercase tracking-wide text-[#e43d16]">
            Carrinho
          </span>

          <div className="flex flex-wrap items-center gap-x-2 text-sm">
            <strong className="text-[#151515]">
              {totals.totalItems} item{totals.totalItems === 1 ? '' : 's'}
            </strong>

            <span className="text-[#d7b8aa]">•</span>

            <span className="font-bold text-[#151515]">
              Cartão {formatCurrency(totals.subtotalCard)}
            </span>

            <span className="hidden text-[#d7b8aa] sm:inline">•</span>

            <span className="hidden font-bold text-emerald-700 sm:inline">
              À vista {formatCurrency(totals.subtotalCash)}
            </span>
          </div>
        </div>

        <Link
          href="/cart"
          className="shrink-0 rounded-xl bg-[#e43d16] px-4 py-3 text-sm font-black text-white shadow-[0_10px_20px_rgba(228,61,22,0.24)] transition hover:bg-[#c82f0d] active:scale-[0.98] sm:px-5"
        >
          Ver carrinho
        </Link>
      </div>
    </div>
  )
}
