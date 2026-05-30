import type { ReactNode } from 'react'

import { AppFooter } from './app-footer'
import { AppHeader } from './app-header'

type AppShellProps = {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <AppHeader />

      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>

      <AppFooter />
    </div>
  )
}