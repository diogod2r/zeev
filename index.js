import fastify from "fastify";
import endpoints from './src/scripts/endpoints.js';
import environment from "./src/scripts/env.js";
import onRequestHook from './src/hooks/onRequest.js';
const { svPort, svHost } = environment;

const server = fastify();
server.addHook('onRequest', onRequestHook);

endpoints.forEach(route => {
  server.route(route);
});

server.listen({ port: svPort, host: svHost }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor rodando em http://${svHost}:${svPort}`);
});