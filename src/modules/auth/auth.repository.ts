import { pool } from '../../config/db.js'; // 👈 এখানে অবশ্যই '.js' এক্সটেনশন দিতে হবে
import { IUserProfile} from './auth.interface.js';

export class AuthRepository {
  
  static async createUser(name: string, email: string, passwordHash: string, role: string): Promise<IUserProfile> {
    const query = `
      INSERT INTO users (name, email, password, role, created_at, updated_at)
      VALUES ($1, $2, $3, $4, NOW(), NOW())
      RETURNING id, name, email, role, created_at, updated_at;
    `;
    const values = [name, email, passwordHash, role];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  
  static async findUserByEmail(email: string): Promise<any | null> {
    const query = `SELECT * FROM users WHERE email = $1;`;
    const { rows } = await pool.query(query, [email]);
    return rows.length ? rows[0] : null;
  }

  
  static async findUsersByIds(ids: number[]): Promise<Partial<IUserProfile>[]> {
    if (ids.length === 0) return [];
    const placeholders = ids.map((_, index) => `$${index + 1}`).join(',');
    const query = `SELECT id, name, role FROM users WHERE id IN (${placeholders});`;
    const { rows } = await pool.query(query, ids);
    return rows;
  }
}