const router = require('express').Router();
const inquiry = require('./model/inquiry');

module.exports = function route(app) {
  app.use(router);
  router.use('/inquiry', inquiry);
};
