import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '../lib/react-query/queryClient';
import type { ReactNode } from 'react';

interface IReactQueryProvider {
  children: ReactNode;
}

function ReactQueryProvider({ children }: IReactQueryProvider) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default ReactQueryProvider;
