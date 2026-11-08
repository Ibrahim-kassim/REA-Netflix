// Entry point: builds the app and starts listening.
import { config } from './config/env.js';
import { createApp } from './app.js';
import { logger } from './utils/logger.js';

const app = createApp();

const server = app.listen(config.port, () => {
  logger.info(`REAflix media server on http://localhost:${config.port}`);
});

const shutdown = (signal) => {
  logger.info(`${signal} received, closing server`);
  server.close(() => process.exit(0));
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
