import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: Number(process.env.PORT) || 5000, 
  jwt_secret: process.env.JWT_SECRET || 'fiwfiwfbwfw;',
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET || 'DHFWUHFIUHFIoi;',
  connection_string: process.env.CONNECTIONSTRING || '',
} as const; 