import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createServer as createViteServer } from 'vite';

// [ ] import.meta.url には何が入るか
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();

  // Vite server を Middleware モードで起動する
  // appType は 'custom' で
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  // Vite の connect instance を Middleware として使う
  app.use(vite.middlewares);

  app.use('*', async (_req, _res) => {
    // serve index.html
    // [ ] ここから始める
  })

  app.listen(5173)
}

createServer();
