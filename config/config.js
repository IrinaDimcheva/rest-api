const env = process.env.NODE_ENV || 'development';

const config = {
	development: {
		port: process.env.PORT || 3000,
		dbURL: process.env.MONGO_ATLAS_DB_URL,
		origin: ['http://localhost:5555', 'http://localhost:4200']
	},
	production: {
		port: process.env.PORT || 3000,
		dbURL: process.env.DB_URL_CREDENTIALS,
		origin: []
	}
};

module.exports = config[env];
