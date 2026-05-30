export function AppHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Consulta Freitas
          </span>

          <h1 className="text-lg font-bold text-zinc-950">
            Consulta de Produtos
          </h1>
        </div>

        <div className="hidden rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-600 sm:block">
          Preço: Preco1
        </div>
      </div>
    </header>
  )
}