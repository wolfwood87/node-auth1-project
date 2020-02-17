const express = require('express');

const apiRouter = require('./api-router.js');
const configureMiddleWare = require('./configure-middleware.js');
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);
const server = express();
const sessionConfig = {
    name: 'cmonster',
    secret: 'ilovecookies',
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false,
      httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
  
    store: new knexSessionStore({
      knex: require('../data/dbConfig.js'),
      tablename: 'sessions',
      sidfieldname: 'sid',
      clearInterval: 1000 * 60 * 60
    })
  }
configureMiddleWare(server)
server.use(session(sessionConfig))

server.use('/api', apiRouter);

module.exports = server;