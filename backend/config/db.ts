require('dotenv').config();
const { Pool } = require('pg');
import type { Pool as PoolType } from "pg";

const pool: PoolType = new Pool({
  connectionString: process.env.CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on('connect', () => {
  console.log('Connected to the db');
});

pool.on('error', (err: Error) => {
  console.error('Unexpected error on idle client', err);
});

module.exports = pool;