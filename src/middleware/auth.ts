// src/middlewares/auth.ts
import { NextFunction, Request, Response } from 'express';
import { TokenPayload, verifyToken } from '../utils/auth';

// Extend Express Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  // Get token from header
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // Check if authorization header has the right format
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Invalid authorization format. Use Bearer {token}' });
  }

  const token = parts[1];
  
  // Verify token
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
  
  // Attach user information to request
  req.user = decoded;
  
  next();
};