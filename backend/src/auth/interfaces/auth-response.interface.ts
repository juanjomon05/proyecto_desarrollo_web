// internal imports
import { User } from '../../users/entities/user.entity.js';

export interface AuthResponse {
  accessToken: string;
  user: Omit<User, 'password'>;
}
