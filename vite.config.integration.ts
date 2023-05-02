import defaultConfig from './vite.config';

import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  defaultConfig,
  defineConfig({
    test: {
      include: ['src/**/*.test.ts'],
      threads: false,
    },
  }),
);
