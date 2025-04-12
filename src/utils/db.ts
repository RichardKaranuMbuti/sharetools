// src/utils/db.ts
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

// Create a connection pool that can be reused throughout the application
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

// Event listener for connection errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle database client', err);
  process.exit(-1);
});

export default pool;