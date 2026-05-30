'use client'

import { FormEvent, useState } from 'react'

type ProductSearchProps = {
  isLoading: boolean
  onSearch: (search: string) => void
  onClear: () => void
}

export function ProductSearch({
  isLoading,
  onSearch,
  onClear,
}: ProductSearchProps) {
  const [search, setSearch] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSearch(search)
  }

  function handleClear() {
    setSearch('')
    onClear()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
    >
      <label
        htmlFor="product-search"
        className="mb-2 block text-sm font-medium text-zinc-700"
      >
        Pesquisar produto
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="product-search"
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Digite nome, código ou código de barras..."
          className="h-12 flex-1 rounded-xl border border-zinc-300 px-4 text-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="h-12 rounded-xl bg-zinc-900 px-6 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Buscando...' : 'Buscar'}
        </button>

        <button
          type="button"
          onClick={handleClear}
          className="h-12 rounded-xl border border-zinc-300 px-6 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
        >
          Limpar
        </button>
      </div>
    </form>
  )
}