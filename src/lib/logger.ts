/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import pino from 'pino';
import { env } from '@/config/env';

const isDev = env.NODE_ENV === 'development';

let defaultOptions: pino.LoggerOptions = {};

if (isDev) {
  defaultOptions = {
    ...defaultOptions,
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  };
}

export type LoggerOptions = {
  context?: string;
};

const logger = pino({
  ...defaultOptions,
});

const Logger = {
  log: (message: any, ...args: any[]): void => {
    logger.info(message, ...args);
  },
  info: (message: any, ...args: any[]): void => {
    logger.info(message, ...args);
  },
  warn: (message: any, ...args: any[]): void => {
    logger.warn(message, ...args);
  },
  error: (message: any, ...args: any[]): void => {
    logger.error(message, ...args);
  },
};

export default Logger;
