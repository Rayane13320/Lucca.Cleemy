// Les versions gratuites des API de conversion sont très limitées donc :

const jsonServer = require("json-server");
const path = require("path");
const bodyParser = require("body-parser");

const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, "db.json"));
const middlewares = jsonServer.defaults();
const rewriter = jsonServer.rewriter({
  "/api/*": "/$1",
});

server.use(bodyParser.json());
server.use(rewriter);
server.use(middlewares);
server.use(router);

server.listen(3001, () => {
  console.log("Currency api is running on port 3001");
});
