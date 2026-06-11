'use client'

import type { ProductSearchField } from '@/types/product'

const searchFieldPlaceholders: Record<ProductSearchField, string> = {
  id: 'ID do produto',
  codigo: 'Codigo do produto',
  nome: 'Nome do produto',
}

type ProductSearchProps = {
  value: string
  searchField: ProductSearchField
  isLoading: boolean
  onChange: (value: string) => void
  onSearchFieldChange: (value: ProductSearchField) => void
}

export function ProductSearch({
  value,
  searchField,
  isLoading,
  onChange,
  onSearchFieldChange,
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
            placeholder={searchFieldPlaceholders[searchField]}
            className="h-12 w-full rounded-xl border border-[#ffd2c2] bg-[#fffaf7] px-4 pr-10 text-base font-bold text-[#151515] outline-none transition placeholder:text-[#8a6d61] focus:border-[#e43d16] focus:bg-white focus:ring-4 focus:ring-[#e43d16]/15"
            autoComplete="off"
          />

          {isLoading && (
            <span className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin rounded-full border-2 border-[#ffd2c2] border-t-[#e43d16]" />
          )}
        </div>

        <select
          value={searchField}
          onChange={(event) =>
            onSearchFieldChange(event.target.value as ProductSearchField)
          }
          aria-label="Tipo de busca"
          className="h-12 shrink-0 rounded-xl border border-[#151515] bg-white px-3 text-sm font-black text-[#151515] outline-none transition hover:border-[#e43d16] hover:bg-[#fff0e8] focus:border-[#e43d16] focus:ring-4 focus:ring-[#e43d16]/15 sm:px-4"
        >
          <option value="nome">Nome</option>
          <option value="codigo">Codigo</option>
          <option value="id">ID</option>
        </select>
      </div>

      <p className="mt-3 text-xs font-semibold text-[#80665c]">
        A busca acontece automaticamente apos voce parar de digitar.
      </p>
    </div>
  )
}
