'use client'

import { useState } from 'react'

import { useCart } from '@/contexts/cart-context'
import { calculateCashPrice } from '@/helpers/cart.helper'
import { copyToClipboard } from '@/helpers/clipboard.helper'
import { formatCurrency } from '@/helpers/currency.helper'
import { getStockStatus } from '@/helpers/stock.helper'
import type { Product } from '@/types/product'

type ProductCardProps = {
    product: Product
}

function formatStock(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 3,
    }).format(value)
}

export function ProductCard({ product }: ProductCardProps) {
    const [copied, setCopied] = useState(false)

    const {
        addProduct,
        cashDiscountPercentage,
        isInCart,
        getQuantity,
    } = useCart()

    const stockStatus = getStockStatus(product.estoque)
    const cashPrice = calculateCashPrice(product.preco, cashDiscountPercentage)
    const cashDiscountAmount = product.preco - cashPrice
    const productIsInCart = isInCart(product.id)
    const quantityInCart = getQuantity(product.id)

    async function handleCopyCode() {
        const success = await copyToClipboard(product.codigo)

        if (!success) {
            return
        }

        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 1500)
    }

    function handleAddToCart() {
        addProduct(product)
    }

    return (
        <article className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
                            Código {product.codigo}
                        </span>

                        <button
                            type="button"
                            onClick={handleCopyCode}
                            className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-600 transition hover:bg-zinc-100"
                        >
                            {copied ? 'Copiado!' : 'Copiar código'}
                        </button>

                        {productIsInCart && (
                            <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                                {quantityInCart} no carrinho
                            </span>
                        )}
                    </div>

                    <h2 className="mt-3 text-base font-semibold leading-6 text-zinc-950 sm:text-lg">
                        {product.nome}
                    </h2>

                    <div className="mt-2 flex flex-col gap-1 text-xs text-zinc-500 sm:flex-row sm:flex-wrap sm:gap-2">
                        <span>EAN: {product.codigoEan || 'Não informado'}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>Localização: {product.localizacao || 'Não informada'}</span>
                    </div>
                </div>

                <div className="shrink-0 rounded-xl bg-zinc-50 p-3 text-left sm:min-w-44 sm:text-right">
                    <span className="text-xs text-zinc-500">Cartão</span>

                    <strong className="mt-1 block text-2xl font-bold text-zinc-950">
                        {formatCurrency(product.preco)}
                    </strong>

                    <div className="mt-3 border-t border-zinc-200 pt-3">
                        <span className="text-xs text-zinc-500">
                            À vista -{cashDiscountPercentage}%
                        </span>

                        <strong className="mt-1 block text-lg font-bold text-green-700">
                            {formatCurrency(cashPrice)}
                        </strong>

                        <span className="mt-1 block text-xs font-medium text-green-600">
                            Economiza {formatCurrency(cashDiscountAmount)}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-zinc-50 p-3">
                    <span className="text-xs text-zinc-500">Estoque atual</span>

                    <p className="mt-1 text-lg font-semibold text-zinc-900">
                        {formatStock(product.estoque)}
                    </p>
                </div>

                <div className="rounded-xl bg-zinc-50 p-3">
                    <span className="text-xs text-zinc-500">Situação</span>

                    <div>
                        <span
                            className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-medium ${stockStatus.className}`}
                        >
                            {stockStatus.label}
                        </span>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex min-h-20 items-center justify-center rounded-xl bg-zinc-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 active:scale-[0.99]"
                >
                    {productIsInCart ? 'Adicionar mais 1' : 'Adicionar ao carrinho'}
                </button>
            </div>
        </article>
    )
}