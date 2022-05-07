const dotenv = require("dotenv");
dotenv.config();

const mongoOptions = {
    dbName: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
};

module.exports = { mongoOptions };
