require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on("connect", () => {
    console.log("Connected to the db");
});

pool.on("error", err => {
    console.error("Unexpected error on idle client", err);
});

module.exports = pool;
