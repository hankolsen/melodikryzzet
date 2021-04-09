/* eslint-disable import/no-extraneous-dependencies */
import React, { FunctionComponent, ReactElement } from 'react';
import '@testing-library/jest-dom';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const Provider: FunctionComponent = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <div>{children}</div>
  </QueryClientProvider>
);

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: Provider, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
