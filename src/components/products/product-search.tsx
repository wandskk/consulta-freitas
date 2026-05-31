'use client'

type ProductSearchProps = {
  value: string
  isLoading: boolean
  onChange: (value: string) => void
  onClear: () => void
}

export function ProductSearch({
  value,
  isLoading,
  onChange,
  onClear,
}: ProductSearchProps) {
  return (
    <div className="rounded-2xl border border-[#ffd2c2] bg-white p-3 shadow-[0_12px_30px_rgba(191,54,12,0.10)] sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <label
          htmlFor="product-search"
          className="block text-xs font-black uppercase tracking-wide text-[#151515]"
        >
          Pesquisar produto
        </label>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            id="product-search"
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Nome, código ou barras"
            className="h-12 w-full rounded-xl border border-[#ffd2c2] bg-[#fffaf7] px-4 pr-10 text-base font-bold text-[#151515] outline-none transition placeholder:text-[#8a6d61] focus:border-[#e43d16] focus:bg-white focus:ring-4 focus:ring-[#e43d16]/15"
            autoComplete="off"
          />

          {isLoading && (
            <span className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin rounded-full border-2 border-[#ffd2c2] border-t-[#e43d16]" />
          )}
        </div>

        <button
          type="button"
          onClick={onClear}
          disabled={!value}
          className="h-12 shrink-0 rounded-xl border border-[#151515] bg-white px-4 text-sm font-black text-[#151515] transition hover:border-[#e43d16] hover:bg-[#fff0e8] hover:text-[#c82f0d] disabled:cursor-not-allowed disabled:border-[#eadbd3] disabled:text-[#a89a94] disabled:opacity-80"
        >
          Limpar
        </button>
      </div>

      <p className="mt-3 text-xs font-semibold text-[#80665c]">
        A busca acontece automaticamente após você parar de digitar.
      </p>
    </div>
  )
}
