import { configDefaults, defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    clearMocks: true,
    passWithNoTests: true,
    threads: false,
    coverage: {
      exclude: [
        ...configDefaults.exclude,
        'src/tests/**/*',
        'src/**/*.error.ts',
        'src/main/config/**/*',
        'src/infra/db/prisma/tests/**/*',
        'src/infra/http/middlewares/error-handler.middleware.ts',
        'src/**/*.spec.ts',
        'src/**/*.mock.ts',
        'src/**/*.factory.ts',
        'src/**/*.test.ts',
      ],
    },
  },
});
