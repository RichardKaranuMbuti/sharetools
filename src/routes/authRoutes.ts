// src/routes/authRoutes.ts
import express from 'express';
import { AuthController } from '../controllers/authController';
import { validateLogin, validateSignup } from '../validators/authValidators';

const router = express.Router();

// Signup route
router.post('/signup', validateSignup, AuthController.signup );

// Login route
router.post('/login', validateLogin, AuthController.login);

export default router;