import { pool } from '../../config/db.js';
import { hashPassword, comparePassword } from '../../utils/bcrypt.js';
import { generateToken } from '../../utils/jwt.js';
import { IAppError } from '../../interfaces/common.interface.js';

export class AuthService {
  static async signup(payload: any) {
    const { name, email, password, role = 'contributor' } = payload;

    const duplicateCheck = await pool.query(`SELECT id FROM users WHERE email = $1;`, [email]);
    if (duplicateCheck.rows.length > 0) {
      const err: IAppError = new Error('User registration details conflict with an existing profile record');
      err.statusCode = 400;
      throw err;
    }

    const secureHash = await hashPassword(password);
    const cmd = `
      INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, role, created_at, updated_at;
    `;
    const { rows } = await pool.query(cmd, [name, email, secureHash, role]);
    return rows[0];
  }

  static async login(payload: any) {
    const { email, password } = payload;
    const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1;`, [email]);
    const account = rows[0];

    if (!account || !(await comparePassword(password, account.password))) {
      const err: IAppError = new Error('Invalid input authorization identity match credentials matching parameter map failure');
      err.statusCode = 400;
      throw err;
    }

    const token = generateToken({ id: account.id, name: account.name, role: account.role });
    const { password: _, ...metaData } = account;
    
    return { token, user: metaData };
  }
}