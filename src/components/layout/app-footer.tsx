export function AppFooter() {
  return (
    <footer className="border-t border-[#ffd2c2] bg-white">
      <div className="h-1 bg-[#e43d16]" />

      <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-5 text-center text-sm font-black text-[#151515]">
        <span>
          Desenvolvido por
          <a
            href="https://instagram.com/wandskk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full  px-2 py-1 text-[#c82f0d] transition hover:bg-[#e43d16] hover:text-white"
            aria-label="Abrir Instagram do Devwk"
          >
            Devwk
          </a>
        </span>
      </div>
    </footer>
  )
}
