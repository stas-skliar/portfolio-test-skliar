require('dotenv').config();
const { URL } = require('url');

const common = {
  dialect: 'postgres',
};

if (process.env.DATABASE_URL) {
  const dbUrl = new URL(process.env.DATABASE_URL);

  module.exports = {
    development: {
      ...common,
      username: dbUrl.username,
      password: dbUrl.password,
      database: dbUrl.pathname.slice(1),
      host: dbUrl.hostname,
      port: dbUrl.port,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    },
  };
} else {
  module.exports = {
    development: {
      ...common,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
    },
  };
}
