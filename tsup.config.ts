import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['src/server.ts'],
  sourcemap: true,
  silent: true,
  clean: true,
  minify: true,
  splitting: false
});
