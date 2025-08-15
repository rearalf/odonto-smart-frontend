import type { ReactNode } from 'react';
import ReactQueryProvider from './ReactQueryProvider';
import ReactThemeProvider from './ReactThemeProvider';

interface IProviders {
  children: ReactNode;
}

function Providers({ children }: IProviders) {
  return (
    <ReactQueryProvider>
      <ReactThemeProvider>{children}</ReactThemeProvider>
    </ReactQueryProvider>
  );
}

export default Providers;
