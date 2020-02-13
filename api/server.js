const express = require('express');

const apiRouter = require('./api-router.js');
const configureMiddleWare = require('./configure=middleware.js');

const server = express();

configureMiddleWare(server)

server.use('/api', apiRouter);

module.exports = server;