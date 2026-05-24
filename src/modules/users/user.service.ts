import { pool } from '../../config/db.js';
import type { IUserSummary } from './user.interface.js';

export class UserService {
  static async findBatchUsers(ids: number[]): Promise<IUserSummary[]> {
    if (ids.length === 0) return [];
    const mapping = ids.map((_, i) => `$${i + 1}`).join(',');
    const query = `SELECT id, name, role FROM users WHERE id IN (${mapping});`;
    const { rows } = await pool.query(query, ids);
    return rows;
  }
}