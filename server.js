const fs = require("fs");
const jsonServer = require("json-server");
const path = require("path");
const _ = require("lodash");
const port = process.env.PORT || 3000;

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

//get the custom routes mapping
var routes = JSON.parse(fs.readFileSync("./test-routes.json"));
server.use(jsonServer.rewriter(routes));

//get all json database files
let obj = {};
let files = fs.readdirSync(path.resolve(__dirname, "./data/"));
files.forEach((file) => {
  if (file.indexOf(".json") > -1) {
    _.extend(obj, require(path.resolve(__dirname, "./data/", file)));
  }
});

const router = jsonServer.router(obj);
server.use(router);

server.listen(port, () => {
  console.log("JSON Server is running");
});
