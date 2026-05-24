import { Pool } from 'pg';
import { config } from './env.js';

export const pool = new Pool({
  connectionString: config.connection_string,
});

pool.on('connect', () => {
  console.log('📦 PostgreSQL connection pool successfully initialized.');
});