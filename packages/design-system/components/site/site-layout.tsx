import React from 'react'
import { Footer } from '@ff/design-system/components/site/footer/footer'
import { Header } from '@ff/design-system/components/site/header/header'
import { cn } from '@ff/design-system/lib/utils'

export default function SiteLayout({
  home,
  children,
}: {
  home?: boolean
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'light bg-background min-h-screen flex flex-col',
        !home && 'py-[72px]'
      )}
    >
      <Header />
      <main className="flex-grow flex flex-col">{children}</main>
      <Footer />
    </div>
  )
}
