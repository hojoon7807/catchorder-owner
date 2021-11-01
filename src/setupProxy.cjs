import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function (app) {
    app.use(
        '/pages',
        createProxyMiddleware({
            target: 'http://localhost:3003/',
            changeOrigin: true
        })
    );
};

