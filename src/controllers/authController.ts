// src/controllers/authController.ts
import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

export class AuthController {
  static async signup(req: Request, res: Response) {
    try {
      const memberData = req.body;
      const result = await AuthService.signup(memberData);
      
      res.status(201).json({
        message: 'Member registered successfully',
        member: result.member,
        token: result.token
      });
    } catch (error: any) {
      if (error.message === 'Email already registered') {
         res.status(409).json({ message: error.message });
        return; // Just return without a value
      }
      
      console.error('Signup error:', error);
      res.status(500).json({ message: 'An error occurred during signup' });
    }
  }
  
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      
      res.status(200).json({
        message: 'Login successful',
        member: result.member,
        token: result.token
      });
    } catch (error: any) {
      if (error.message === 'Invalid email or password') {
        res.status(401).json({ message: error.message });
        return; // Just return without a value
      }
      
      console.error('Login error:', error);
      res.status(500).json({ message: 'An error occurred during login' });
    }
  }
}