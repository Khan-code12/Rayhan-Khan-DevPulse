import { pool } from '../config/db.js';
import { hashPassword } from '../utils/bcrypt.js';

export const runSeed = async (): Promise<void> => {
  const result = await pool.query(`SELECT COUNT(*) FROM users;`);
  if (parseInt(result.rows[0].count, 10) === 0) {
    const hashedPass = await hashPassword('securePassword123');
    await pool.query(`
      INSERT INTO users (name, email, password, role)
      VALUES ('Default Maintainer', 'maintainer@devpulse.com', $1, 'maintainer');
    `, [hashedPass]);
    console.log('🌱 Seed payload successfully written to users infrastructure.');
  }
};