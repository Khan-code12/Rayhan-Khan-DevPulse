import { pool } from '../config/db.js';

export const initTriggers = async (): Promise<void> => {
  await pool.query(`
    CREATE OR REPLACE FUNCTION update_timestamp_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

  await pool.query(`
    DROP TRIGGER IF EXISTS trigger_update_users_timestamp ON users;
    CREATE TRIGGER trigger_update_users_timestamp
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp_column();
  `);

  await pool.query(`
    DROP TRIGGER IF EXISTS trigger_update_issues_timestamp ON issues;
    CREATE TRIGGER trigger_update_issues_timestamp
    BEFORE UPDATE ON issues
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp_column();
  `);
};