// external imports
import { Request } from 'express';

// internal imports
import { JwtPayload } from './jwt-payload.interface.js';

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}
