import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { createProxyMiddleware } from 'http-proxy-middleware';
import axios from 'axios';

export async function registerRoutes(app: Express): Promise<Server> {
  // Add test endpoint for debugging API calls
  app.get('/api/gettest/:path(*)', async (req, res) => {
    try {
      const path = req.params.path;
      const response = await axios.get(`https://cmixbe.replit.app/api/chess/${path}`, {
        headers: {
          'X-API-Key': '08c1ee062a38814564eb8ca468d2f411'
        }
      });
      res.json(response.data);
    } catch (error: any) {
      res.status(500).json({
        error: 'API Request Failed',
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
    }
  });

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
    pathRewrite: {
      '^/api/chess': '/api/chess' // Keep the /api/chess prefix when forwarding
    },
    onError: (err, req, res) => {
      console.error('Proxy Error:', err);
      res.status(500).json({ error: 'Proxy Error', message: err.message });
    },
    logLevel: 'debug'
  }));

  const httpServer = createServer(app);
  return httpServer;
}