import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { createProxyMiddleware } from 'http-proxy-middleware';

export async function registerRoutes(app: Express): Promise<Server> {
  // Proxy middleware configuration
  app.use('/api/chess', createProxyMiddleware({
    target: 'https://cmixbe.replit.app',
    changeOrigin: true,
    secure: false,
    onProxyReq: function (proxyReq) {
      // Add API key header to the proxied request
      proxyReq.setHeader('X-API-Key', '08c1ee062a38814564eb8ca468d2f411');
    },
    onProxyRes: function (proxyRes) {
      // Add CORS headers to the proxied response
      proxyRes.headers['access-control-allow-origin'] = '*';
      proxyRes.headers['access-control-allow-methods'] = 'GET,POST,PUT,DELETE,OPTIONS';
      proxyRes.headers['access-control-allow-headers'] = 'Content-Type';
    },
  }));

  const httpServer = createServer(app);
  return httpServer;
}