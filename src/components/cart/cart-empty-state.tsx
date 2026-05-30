import Link from 'next/link'

export function CartEmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-8 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-2xl">
        🛒
      </div>

      <h3 className="mt-4 text-lg font-bold text-zinc-950">
        Seu carrinho está vazio
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
        Pesquise produtos, adicione itens e use o carrinho para simular valores
        no cartão e à vista.
      </p>

      <Link
        href="/products"
        className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-zinc-950 px-5 text-sm font-semibold text-white transition hover:bg-zinc-800"
      >
        Buscar produtos
      </Link>
    </div>
  )
}