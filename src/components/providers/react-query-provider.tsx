'use client'

import * as React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Spinner } from '@/components/templates/spinner'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 0.5,
      gcTime: 1000 * 60 * 5,
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
  },
})

function ReactQueryProvider({ children }: React.PropsWithChildren) {
  return (
    <React.Suspense fallback={<Spinner.FullPage />}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.Suspense>
  )
}

export { ReactQueryProvider, queryClient }
