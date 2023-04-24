import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['src/'],
  sourcemap: true,
  silent: true,
  clean: true,
  splitting: false,
});
