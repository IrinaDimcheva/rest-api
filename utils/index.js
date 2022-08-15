const jwt = require('./jwt');
const auth = require('./auth');
const errorHandler = require('./errHandler');
const admin = require('./admin');

module.exports = {
	jwt,
	auth,
	errorHandler,
	admin
}
