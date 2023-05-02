import { configDefaults, defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    clearMocks: true,
    coverage: {
      exclude: [
        ...configDefaults.exclude,
        'src/tests/**/*',
        'src/**/*.error.ts',
      ],
    },
  },
});
