export function AppFooter() {
  return (
    <footer className="border-t border-[#ffd2c2] bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs font-semibold text-[#80665c] sm:flex-row sm:items-center sm:justify-between">
        <span>
          Sistema interno de consulta rápida para produtos, preços e estoque.
        </span>

        <span>Desenvolvido com Next.js, TypeScript e Tailwind CSS.</span>
      </div>
    </footer>
  )
}
