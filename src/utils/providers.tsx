// src/app/providers.tsx
'use client'

import { ReactNode } from 'react'
import { AuthProvider } from 'root/context/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            refetchOnWindowFocus: false, // Don't refetch on window focus (annoying during dev)
        },
    },
})

export function Providers({ children }: { children: ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>{children}</AuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />{' '}
            {/* Dev tools - amazing! */}
        </QueryClientProvider>
    )
}
