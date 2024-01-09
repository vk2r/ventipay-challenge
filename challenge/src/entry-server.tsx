import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

// App
import App from './App';

// Definitions
type Props = {
  path: string;
}
export const render = ({ path }: Props) => {
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={path}>
        <App/>
      </StaticRouter>
    </React.StrictMode>
  );
  return { html };
};