import { env } from '@/main/config/env';
import Logger from './config/logger';
import { app } from '@/infra/http/config/app';

const { PORT: port, HOST: host } = env;

app
  .listen({
    port,
    host,
  })
  .then(() => {
    Logger.info(`Server listening on ${host}:${port}`);
    Logger.info(`Environment: ${env.NODE_ENV}`);
  })
  .catch((err) => {
    Logger.error(err);
    process.exit(1);
  });

function gracefulShutdown(message?: string): void {
  if (message) {
    Logger.info(message);
  }

  app.close(() => {
    Logger.info('HTTP server closed');
  });

  process.exitCode = 0;
}

process.on('SIGINT', () => {
  gracefulShutdown('SIGINT signal received: closing HTTP server');
});

process.on('SIGTERM', () => {
  gracefulShutdown('SIGTERM signal received: closing HTTP server');
});

process.on('uncaughtException', (err) => {
  Logger.error(err);
  process.exitCode = 1;
});
