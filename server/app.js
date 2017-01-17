/**
 * 应用
 * @author Philip
 */

'use strict';

const koa = require('koa');
const logger = require('koa-logger');
const koaPassport = require('koa-passport');

const path = require('path');
const fs = require('fs');

const api = require('./config/api');
const routes = require('./config/routes');
const config = require('./config/config');
const db = require('./models/db');
const passport = require('./config/passport');
const middleware = require('./config/middleware');

var app = koa();

// Logger
app.use(logger());

passport(koaPassport, config);
middleware(app, config, koaPassport);

// Routes
routes(app, koaPassport);
api(app, koaPassport);

db.init();

app.listen(config.app.port);



