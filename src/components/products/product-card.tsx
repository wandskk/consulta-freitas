'use client'

import { useState } from 'react'

import { QuantityControl } from '@/components/cart/quantity-control'
import { useCart } from '@/contexts/cart-context'
import { calculateCashPrice } from '@/helpers/cart.helper'
import { formatCurrency } from '@/helpers/currency.helper'
import { getStockStatus } from '@/helpers/stock.helper'
import type { Product } from '@/types/product'

type ProductCardProps = {
    product: Product
}

type CopyStatus = 'idle' | 'copied' | 'error'

function formatStock(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 3,
    }).format(value)
}

async function copyTextToClipboard(text: string) {
    if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
        return
    }

    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
}

export function ProductCard({ product }: ProductCardProps) {
    const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle')
    const {
        addProduct,
        cashDiscountPercentage,
        isInCart,
        getQuantity,
        increaseQuantity,
        decreaseQuantity,
        updateQuantity,
    } = useCart()

    const stockStatus = getStockStatus(product.estoque)
    const cashPrice = calculateCashPrice(product.preco, cashDiscountPercentage)
    const cashDiscountAmount = product.preco - cashPrice
    const productIsInCart = isInCart(product.id)
    const quantityInCart = getQuantity(product.id)

    function handleAddToCart() {
        addProduct(product)
    }

    async function handleCopyProductInfo() {
        const productInfo = [
            `Nome do produto: ${product.nome}`,
            `Preço no cartão: ${formatCurrency(product.preco)}`,
            `Preço à vista: ${formatCurrency(cashPrice)}`,
        ].join('\n')

        try {
            await copyTextToClipboard(productInfo)
            setCopyStatus('copied')
        } catch {
            setCopyStatus('error')
        }

        window.setTimeout(() => {
            setCopyStatus('idle')
        }, 2000)
    }

    return (
        <article className="overflow-hidden rounded-2xl border border-[#ffd2c2] bg-white shadow-[0_12px_28px_rgba(191,54,12,0.10)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(191,54,12,0.16)]">
            <div className="h-1.5 bg-[#e43d16]" />

            <div className="p-4 pb-3">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[#fff0e8] px-3 py-1 text-[11px] font-black uppercase tracking-wide text-[#c82f0d]">
                            Código {product.codigo}
                        </span>

                        {productIsInCart && (
                            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700">
                                {quantityInCart} no carrinho
                            </span>
                        )}
                    </div>

                    <h2 className="mt-3 text-base font-black leading-6 text-[#151515] sm:text-lg">
                        {product.nome}
                    </h2>

                    <div className="mt-2 grid gap-1 text-xs font-semibold text-[#80665c] sm:flex sm:flex-wrap sm:gap-2">
                        <span>EAN: {product.codigoEan || 'Não informado'}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>Localização: {product.localizacao || 'Não informada'}</span>
                    </div>
                </div>

                <div className="mt-4 rounded-2xl border border-[#ffd2c2] bg-[#fff7f0] p-3">
                    <div className="grid grid-cols-[1fr_auto] gap-3">
                        <div>
                            <span className="text-xs font-black uppercase tracking-wide text-[#80665c]">Cartão</span>
                            <strong className="mt-1 block text-2xl font-black text-[#151515]">
                                {formatCurrency(product.preco)}
                            </strong>
                        </div>

                        <div className="rounded-xl bg-white px-3 py-2 text-right shadow-sm">
                            <span className="text-[11px] font-black uppercase tracking-wide text-emerald-700">
                                À vista
                            </span>
                            <strong className="mt-1 block text-lg font-black text-emerald-700">
                                {formatCurrency(cashPrice)}
                            </strong>
                        </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-[#ffd2c2] pt-3 text-xs font-bold text-[#80665c]">
                        <span>Economia à vista</span>
                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700">
                            {formatCurrency(cashDiscountAmount)}
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 border-y border-[#ffd2c2] bg-[#fffaf7]">
                <div className="border-r border-[#ffd2c2] p-4">
                    <span className="text-xs font-black uppercase tracking-wide text-[#80665c]">Estoque</span>

                    <p className="mt-1 text-lg font-black text-[#151515]">
                        {formatStock(product.estoque)}
                    </p>
                </div>

                <div className="p-4">
                    <span className="text-xs font-black uppercase tracking-wide text-[#80665c]">Situação</span>

                    <div>
                        <span
                            className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-bold ${stockStatus.className}`}
                        >
                            {stockStatus.label}
                        </span>
                    </div>
                </div>
            </div>

            <div className="bg-white p-3">
                {productIsInCart ? (
                    <div className="grid gap-2 sm:grid-cols-[auto_1fr] sm:items-center">
                        <QuantityControl
                            quantity={quantityInCart}
                            onDecrease={() => decreaseQuantity(product.id)}
                            onIncrease={() => increaseQuantity(product.id)}
                            onChange={(quantity) =>
                                updateQuantity(product.id, quantity)
                            }
                        />

                        <button
                            type="button"
                            onClick={handleCopyProductInfo}
                            className="flex min-h-12 w-full items-center justify-center rounded-xl border border-[#ffd2c2] bg-white px-4 py-3 text-sm font-black text-[#c82f0d] transition hover:border-[#e43d16] hover:bg-[#fff0e8] active:scale-[0.99]"
                        >
                            {copyStatus === 'copied'
                                ? 'Copiado'
                                : copyStatus === 'error'
                                  ? 'Erro ao copiar'
                                  : 'Copiar'}
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-2 sm:grid-cols-2">
                        <button
                            type="button"
                            onClick={handleAddToCart}
                            className="flex min-h-12 w-full items-center justify-center rounded-xl bg-[#e43d16] px-4 py-3 text-sm font-black text-white shadow-[0_10px_20px_rgba(228,61,22,0.24)] transition hover:bg-[#c82f0d] active:scale-[0.99]"
                        >
                            Adicionar ao carrinho
                        </button>

                        <button
                            type="button"
                            onClick={handleCopyProductInfo}
                            className="flex min-h-12 w-full items-center justify-center rounded-xl border border-[#ffd2c2] bg-white px-4 py-3 text-sm font-black text-[#c82f0d] transition hover:border-[#e43d16] hover:bg-[#fff0e8] active:scale-[0.99]"
                        >
                            {copyStatus === 'copied'
                                ? 'Copiado'
                                : copyStatus === 'error'
                                  ? 'Erro ao copiar'
                                  : 'Copiar'}
                        </button>
                    </div>
                )}
            </div>
        </article>
    )
}
