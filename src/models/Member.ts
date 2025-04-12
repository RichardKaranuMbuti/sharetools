// src/models/Member.ts
import bcrypt from 'bcrypt';
import pool from '../utils/db';

export interface Member {
  member_id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  phone: string;
  registration_date?: Date;
  is_active?: boolean;
}

export interface MemberWithoutPassword {
  member_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  registration_date: Date;
  is_active: boolean;
}

export class MemberModel {
  static async create(member: Member): Promise<MemberWithoutPassword> {
    const { first_name, last_name, email, password, phone } = member;
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password!, salt);
    
    const result = await pool.query(
      `INSERT INTO members (first_name, last_name, email, password, phone, registration_date, is_active) 
       VALUES ($1, $2, $3, $4, $5, CURRENT_DATE, TRUE) 
       RETURNING member_id, first_name, last_name, email, phone, registration_date, is_active`,
      [first_name, last_name, email, hashedPassword, phone]
    );
    
    return result.rows[0];
  }
  
  static async findByEmail(email: string): Promise<Member | null> {
    const result = await pool.query(
      'SELECT * FROM members WHERE email = $1',
      [email]
    );
    
    return result.rows.length ? result.rows[0] : null;
  }
  
  static async findById(id: number): Promise<MemberWithoutPassword | null> {
    const result = await pool.query(
      'SELECT member_id, first_name, last_name, email, phone, registration_date, is_active FROM members WHERE member_id = $1',
      [id]
    );
    
    return result.rows.length ? result.rows[0] : null;
  }
}