export function AppFooter() {
  return (
    <footer className="border-t border-[#ffd2c2] bg-white">
      <div className="h-1 bg-[#e43d16]" />

      <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-5 text-center text-sm font-black text-[#151515]">
        <span>
          Feito com amor,{' '}
          <a
            href="https://instagram.com/wandskk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#fff0e8] px-3 py-1 text-[#c82f0d] transition hover:bg-[#e43d16] hover:text-white"
            aria-label="Abrir Instagram do Devwk"
          >
            Devwk
            <svg
              aria-hidden="true"
              className="h-3.5 w-3.5 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z" />
            </svg>
          </a>
        </span>
      </div>
    </footer>
  )
}
