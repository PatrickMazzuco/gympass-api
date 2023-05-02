import { env } from '@/main/config/env';
import Logger from './config/logger';
import { app } from '@/infra/http/app';
import '@/infra/http/routes';
import { errorHandlerMiddleware } from '@/infra/http/middlewares/error-handler.middleware';

const { PORT: port, HOST: host } = env;

app.setErrorHandler(errorHandlerMiddleware);

app
  .listen({
    port,
    host,
  })
  .then(() => {
    Logger.info(`Server listening on ${host}:${port}`);
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
