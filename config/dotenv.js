const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve('./enviroments/', process.env.NODE_ENV + '.env'),
});

const { NODE_ENV, HOST, PORT, DB_HOST, DB_USER, DB_PASS, DB_DATABASE } = process.env;

module.exports = {
    NODE_ENV: NODE_ENV || 'development',
    HOST: HOST || '127.0.0.1',
    PORT: PORT || 3000,
    DB_HOST: DB_HOST || 'localhost',
    DB_USER: DB_USER || 'root',
    DB_PASS: DB_PASS || '',
    DB_DATABASE: DB_DATABASE || 'nodejs_mysql',
};
