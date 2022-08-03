global.__basedir = __dirname;
require('dotenv').config()
const dbConnector = require('./config/db');
const apiRouter = require('./router');
const cors = require('cors');
const { errorHandler } = require('./utils');

dbConnector()
  .then(() => {
    const config = require('./config/config');

    const app = require('express')();
    require('./config/express')(app);

    app.use(cors({
      origin: config.origin,
      credentials: true
    }));

    app.use('/api', apiRouter);

    app.use(errorHandler);

    app.listen(config.port, console.log(`Listening on port ${config.port}!`));
  })
  .catch(console.error);

// module.exports = () => (req, res, next) => {

//   const allowedHost = {
//     'http://localhost:3000': true
//   }

//   if (allowedHost[req.headers.origin]) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next()
//   } else {
//     res.send(403, { auth: false })
//   }
// };