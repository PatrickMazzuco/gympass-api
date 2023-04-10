import { app } from './app';

const port = 3000;
const host = '0.0.0.0';

app.listen({
  port,
  host,
}).then(() => {
  console.log(`Server listening on ${host}:${port}`);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
