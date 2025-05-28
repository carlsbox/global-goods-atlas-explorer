
const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');

const app = express();

// Proxy for local development
app.use('/api/v1', createProxyMiddleware({
  target: 'http://localhost:8081',
  changeOrigin: true,
  pathRewrite: {
    '^/api/v1': ''
  }
}));

const PORT = process.env.CMS_PROXY_PORT || 8082;
app.listen(PORT, () => {
  console.log(`CMS Proxy server running on port ${PORT}`);
});
