import type { UserRole } from '../auth/auth.interface.js';

export interface IUserSummary {
  id: number;
  name: string;
  role: UserRole;
}