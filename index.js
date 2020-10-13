const path = require('path');
const debug = require('debug')('cfl-back:index');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const bluebird = require('bluebird');
const cors = require('cors');
const enforce = require('express-sslify');
const config = require('./config');
const routes = require('./routes');

const corsOptions = {
  origin: JSON.parse(process.env.AllowUrl).urls,
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const app = express();

/* istanbul ignore next */
if (process.env.NODE_ENV === 'production' && process.env.BUILD_BRANCH === 'master') app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(express.static(path.normalize(path.join(__dirname, 'cfl-front/dist'))));
app.use('/daycare', express.static(path.normalize(path.join(__dirname, 'caring-child-daycare/dist'))));
app.use(cors(corsOptions));
mongoose.Promise = bluebird;
let mongoDbUri = process.env.MONGO_DB_URI;
/* istanbul ignore else */
if (process.env.NODE_ENV === 'test') {
  mongoDbUri = process.env.TEST_DB;
}
mongoose.connect(mongoDbUri, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
});
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
routes(app);
app.get('*', (req, res) => {
  res.sendFile(path.normalize(path.join(__dirname, 'cfl-front/dist/index.html')));
});
app.use((err, req, res) => {
  res.status(err.status || 500)
    .json({ message: err.message, error: err });
});

/* istanbul ignore if */if (process.env.NODE_ENV !== 'test') {
  app.listen(config.server.port, () => {
    debug('running in debug mode');
    console.log(`Magic happens on port ${config.server.port}`); // eslint-disable-line no-console
  });
}

module.exports = app;
