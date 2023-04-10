import { app } from './app';
import { env } from '@/config/env';

const { PORT: port, HOST: host } = env;

app.listen({
  port,
  host,
}).then(() => {
  console.log(`Server listening on ${host}:${port}`);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
