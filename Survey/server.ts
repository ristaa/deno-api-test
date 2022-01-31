import {Application, Router, RouterContext} from "./deps.ts"
import router from "./router.ts";

const app = new Application();

app.use(oakCors({ origin: "*" }));
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener('listen', ({hostname, port, secure}) => {
  console.log(`Listening on ${secure ? 'https://' : 'http://'} ${hostname || 'localhost'}:${port}`);
});

await app.listen({port: 8000});