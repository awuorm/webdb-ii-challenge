const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const carsRouter = require("./data/carsRouter");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use("/api/cars",carsRouter);

module.exports = server;