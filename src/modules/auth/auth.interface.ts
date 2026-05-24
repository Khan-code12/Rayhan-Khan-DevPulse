import { ROLES } from '../../constants/roles.js';

export type UserRole = typeof ROLES[keyof typeof ROLES];

export interface IUserProfile {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
}