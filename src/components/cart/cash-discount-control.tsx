'use client'

import { useId, useState } from 'react'

import { useCart } from '@/contexts/cart-context'

type CashDiscountControlProps = {
  variant?: 'default' | 'compact' | 'summary'
}

export function CashDiscountControl({
  variant = 'default',
}: CashDiscountControlProps) {
  const inputId = useId()
  const { cashDiscountPercentage, updateCashDiscountPercentage } = useCart()
  const [discountInputValue, setDiscountInputValue] = useState(
    String(cashDiscountPercentage)
  )
  const [isEditingDiscount, setIsEditingDiscount] = useState(false)

  const isCompact = variant === 'compact'
  const isSummary = variant === 'summary'
  const visibleDiscountValue = isEditingDiscount
    ? discountInputValue
    : String(cashDiscountPercentage)

  return (
    <div
      className={
        isSummary
          ? 'rounded-2xl border border-[#ffd2c2] bg-[#fff7f0] p-3'
          : isCompact
            ? 'rounded-2xl border border-[#ffd2c2] bg-white p-3 shadow-sm'
            : 'rounded-2xl border border-[#ffd2c2] bg-white p-4 shadow-sm'
      }
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <label
            htmlFor={inputId}
            className={
              isSummary
                ? 'block text-xs font-black uppercase tracking-wide text-[#80665c]'
                : 'block text-sm font-black text-[#151515]'
            }
          >
            Desconto a vista
          </label>

          {!isSummary && (
            <p className="mt-1 text-xs font-semibold text-[#80665c]">
              Afeta listagem e carrinho.
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            id={inputId}
            type="number"
            min={0}
            max={100}
            value={visibleDiscountValue}
            onFocus={() => {
              setIsEditingDiscount(true)
              setDiscountInputValue(String(cashDiscountPercentage))
            }}
            onChange={(event) => {
              const nextValue = event.target.value

              setDiscountInputValue(nextValue)

              if (nextValue === '') {
                return
              }

              updateCashDiscountPercentage(Number(nextValue))
            }}
            onBlur={() => {
              setIsEditingDiscount(false)

              if (discountInputValue === '') {
                setDiscountInputValue(String(cashDiscountPercentage))
              }
            }}
            className={
              isSummary
                ? 'h-11 min-w-0 flex-1 rounded-xl border border-[#ffd2c2] bg-white px-3 text-sm font-black text-[#151515] outline-none focus:border-[#e43d16] focus:ring-4 focus:ring-[#e43d16]/15'
                : 'h-11 w-24 rounded-xl border border-[#ffd2c2] bg-white px-3 text-center text-sm font-black text-[#151515] outline-none focus:border-[#e43d16] focus:ring-4 focus:ring-[#e43d16]/15'
            }
          />

          <span
            className={
              isSummary
                ? 'rounded-xl bg-white px-3 py-3 text-sm font-black text-[#80665c]'
                : 'text-sm font-black text-[#80665c]'
            }
          >
            %
          </span>
        </div>
      </div>
    </div>
  )
}
