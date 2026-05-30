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
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <label
        htmlFor="product-search"
        className="mb-2 block text-sm font-medium text-zinc-700"
      >
        Pesquisar produto
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <input
            id="product-search"
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Digite nome, código ou código de barras..."
            className="h-12 w-full rounded-xl border border-zinc-300 px-4 pr-10 text-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200"
            autoComplete="off"
          />

          {isLoading && (
            <span className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900" />
          )}
        </div>

        <button
          type="button"
          onClick={onClear}
          disabled={!value}
          className="h-12 rounded-xl border border-zinc-300 px-6 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Limpar
        </button>
      </div>

      <p className="mt-3 text-xs text-zinc-500">
        A busca acontece automaticamente após você parar de digitar.
      </p>
    </div>
  )
}