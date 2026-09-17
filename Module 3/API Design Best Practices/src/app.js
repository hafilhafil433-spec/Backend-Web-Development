const express = require('express');
const postRoutes = require('./routes/postRoutes');
const { resetData } = require('./data/postStore');
const controller = require('./controllers/postController');
const http = require('./utils/http');

function createApp() {
  const app = express();
  app.use(express.json());
  app.use('/', postRoutes);

  // Safe public demo route: logs the real failure, exposes only a stable error contract.
  app.get('/internal/failure', controller.explode);

  app.use((req, res) => {
    return http.sendError(res, 404, 'ROUTE_NOT_FOUND', 'Route not found');
  });

  app.use((err, req, res, next) => {
    console.error(err);
    return http.sendError(res, 500, 'INTERNAL_ERROR', 'Internal server error');
  });

  return app;
}

if (require.main === module) {
  const app = createApp();
  const port = 3000;
  app.listen(port, () => console.log(`API listening on port ${port}`));
}

module.exports = { createApp, resetData };
