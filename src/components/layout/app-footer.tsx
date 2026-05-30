export function AppFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <span>
          Sistema interno de consulta rápida para produtos, preços e estoque.
        </span>

        <span>Desenvolvido com Next.js, TypeScript e Tailwind CSS.</span>
      </div>
    </footer>
  )
}