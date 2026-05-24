import { pool } from '../config/db.js';

export const createTables = async (): Promise<void> => {
  // users table setup
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role VARCHAR(20) DEFAULT 'contributor',
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      CONSTRAINT check_user_role CHECK (role IN ('contributor', 'maintainer'))
    );
  `);

  // issues table setup
  await pool.query(`
    CREATE TABLE IF NOT EXISTS issues (
      id SERIAL PRIMARY KEY,
      title VARCHAR(150) NOT NULL,
      description TEXT NOT NULL,
      type VARCHAR(20) NOT NULL,
      status VARCHAR(20) DEFAULT 'open',
      reporter_id INT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      CONSTRAINT check_issue_type CHECK (type IN ('bug', 'feature_request')),
      CONSTRAINT check_issue_status CHECK (status IN ('open', 'in_progress', 'resolved'))
    );
  `);
};