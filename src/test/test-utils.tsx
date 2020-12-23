/* eslint-disable import/no-extraneous-dependencies */
import React, { FunctionComponent, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

const Provider: FunctionComponent = ({ children }) => {
  return <div>{children}</div>;
};

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: Provider, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
