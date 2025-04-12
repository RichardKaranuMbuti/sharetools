// src/validators/authValidators.ts
import { NextFunction, Request, Response } from 'express';
import joi from 'joi';

// Validation schema for member signup
const signupSchema = joi.object({
  first_name: joi.string().required().min(2).max(50),
  last_name: joi.string().required().min(2).max(50),
  email: joi.string().email().required().max(100),
  password: joi.string().required().min(8).max(100),
  phone: joi.string().required().min(10).max(20)
});

// Validation schema for member login
const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required()
});

// Signup validation middleware
export const validateSignup = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = signupSchema.validate(req.body);
  
  if (error) {
    res.status(400).json({ 
      message: 'Validation error', 
      details: error.details[0].message 
    });
    return; // Just return without a value
  }
  
  next();
};

// Login validation middleware
export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = loginSchema.validate(req.body);
  
  if (error) {
    res.status(400).json({ 
      message: 'Validation error', 
      details: error.details[0].message 
    });
    return; // Just return without a value
  }
  
  next();
};