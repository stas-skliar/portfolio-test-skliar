require('dotenv').config();
const { URL } = require('url');

let config;

if (process.env.DATABASE_URL) {
  const dbUrl = new URL(process.env.DATABASE_URL);

  config = {
    development: {
      username: dbUrl.username,
      password: dbUrl.password,
      database: dbUrl.pathname.slice(1),
      host: dbUrl.hostname,
      port: dbUrl.port,
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    },
  };
} else {
  config = {
    development: {
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'postgres',
    },
  };
}

module.exports = config;
