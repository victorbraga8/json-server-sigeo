const path = require("path");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "data.geojson"));
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.get("/", (req, res) => {
  res.jsonp({ message: "Bem-vindo à API JSON-Server customizada!" });
});

server.get("/features", (req, res) => {
  const db = router.db;
  const features = db.get("features").value();
  res.jsonp(features);
});

server.use(router);

module.exports = server;
