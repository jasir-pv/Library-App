const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://library-server-4h5b.onrender.com",
      changeOrigin: true,
    })
  );
};
