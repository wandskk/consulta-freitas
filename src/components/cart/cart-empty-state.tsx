import Link from 'next/link'

export function CartEmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-[#ffc5af] bg-white p-8 text-center shadow-[0_12px_28px_rgba(191,54,12,0.10)]">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff0e8] text-xl font-black text-[#e43d16]">
        F
      </div>

      <h3 className="mt-4 text-lg font-black text-[#151515]">
        Seu carrinho está vazio
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#80665c]">
        Adicione produtos para conferir os totais.
      </p>

      <Link
        href="/products"
        className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-[#e43d16] px-5 text-sm font-black text-white shadow-[0_10px_20px_rgba(228,61,22,0.24)] transition hover:bg-[#c82f0d]"
      >
        Buscar produtos
      </Link>
    </div>
  )
}
