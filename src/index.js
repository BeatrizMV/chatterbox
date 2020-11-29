"use strict";

const express = require("express");
const socket = require("socket.io");
const bodyparser = require("body-parser");
const app = express();

const path = require("path");

const config = require("./config");

const router = require("./router");

app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "./public")));
app.use(router);

app.listen(config.port, config.hostname, () => {
  console.log(`Server listening on http://${config.hostname}:${config.port}`); // eslint-disable-line no-console
});

var http = require("http");

const server = http
  .createServer()
  .listen(config.webservicePort, config.hostname);

const io = socket(server, { cors: { origin: "*" } });

io.on("connection", () => {
  console.log("Nuevo usuario conectado");
});
