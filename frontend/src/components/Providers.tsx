'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { useState, type ReactNode } from 'react'
import { AuthProvider } from '@/hooks/useAuth'

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 30_000, retry: 1 },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#0f0f0f',
              color: '#e7e5e4',
              border: '1px solid #3f0a0a',
              fontFamily: 'var(--font-crimson), Georgia, serif',
              fontSize: '1rem',
            },
            success: {
              iconTheme: { primary: '#f97316', secondary: '#0f0f0f' },
            },
            error: {
              iconTheme: { primary: '#dc2626', secondary: '#0f0f0f' },
            },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  )
}
