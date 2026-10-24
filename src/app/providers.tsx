'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 60_000, retry: 1 } },
      })
  );

  return (
    <ThemeProvider>
      <QueryClientProvider client={client}>
        {children}
        <ToastContainer position="bottom-right" theme="light" aria-label="Notifications" />
      </QueryClientProvider>
    </ThemeProvider>
  );
}