import express from 'express';
import fs from 'node:fs/promises';

// Instances
const routes = express.Router();

// Constants
const isProduction = process.env.NODE_ENV === 'production';
const base = process.env.BASE || '/';

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : '';
const ssrManifest = isProduction
  ? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8')
  : undefined;

// Add Vite or respective production middlewares
let vite;
if (!isProduction) {
  const { createServer } = await import('vite');
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base
  });
  routes.use(vite.middlewares);
} else {
  const compression = (await import('compression')).default;
  const sirv = (await import('sirv')).default;
  routes.use(compression());
  routes.use(base, sirv('./dist/client', { extensions: [], gzip: true }));
}

routes.use('/', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '');
    let template, render;
    if (!isProduction) {
      // Always read fresh templates in development
      template = await fs.readFile('./index.html', 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
    } else {
      template = templateHtml;
      render = (await import('./dist/server/entry-server.js')).render;
    }
    const rendered = await render({ path: req.originalUrl }, ssrManifest);
    const html = template
      .replace('<!--app-head-->', rendered.head ?? '')
      .replace('<!--app-html-->', rendered.html ?? '');
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

export default routes;

