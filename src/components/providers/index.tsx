import * as React from 'react'

import { Toaster as SonnerToaster } from '@/components/ui/sonner'
import { Toaster } from '@/components/ui/toaster'

import { GlobalDialog } from '../templates/global-dialog'
import { JotaiProvider } from './jotai-provider'
import { NextAuthProvider } from './next-auth-provider'
import { ReactQueryProvider } from './react-query-provider'
import { ThemeProvider } from './theme-provider'
import { TooltipProvider } from './tooltip-provider'

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <ReactQueryProvider>
      <JotaiProvider>
        <NextAuthProvider>
          <ThemeProvider>
            <TooltipProvider>{children}</TooltipProvider>
            <GlobalDialog />
            <SonnerToaster />
            <Toaster />
          </ThemeProvider>
        </NextAuthProvider>
      </JotaiProvider>
    </ReactQueryProvider>
  )
}
