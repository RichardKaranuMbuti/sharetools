// src/services/authService.ts
import { Member, MemberModel, MemberWithoutPassword } from '../models/Member';
import { comparePasswords, generateToken } from '../utils/auth';

export class AuthService {
  static async signup(memberData: Member): Promise<{ member: MemberWithoutPassword, token: string }> {
    try {
      // Check if email already exists
      const existingMember = await MemberModel.findByEmail(memberData.email);
      if (existingMember) {
        throw new Error('Email already registered');
      }
      
      // Create new member
      const newMember = await MemberModel.create(memberData);
      
      // Generate JWT token
      const token = generateToken({
        id: newMember.member_id,
        email: newMember.email
      });
      
      return { member: newMember, token };
    } catch (error) {
      throw error;
    }
  }
  
  static async login(email: string, password: string): Promise<{ member: MemberWithoutPassword, token: string }> {
    try {
      // Find member by email
      const member = await MemberModel.findByEmail(email);
      if (!member) {
        throw new Error('Invalid email or password');
      }
      
      // Verify password
      const isPasswordValid = await comparePasswords(password, member.password!);
      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }
      
      // Generate JWT token
      const token = generateToken({
        id: member.member_id!,
        email: member.email
      });
      
      // Remove password from returned member object
      const { password: _, ...memberWithoutPassword } = member;
      
      return { 
        member: memberWithoutPassword as MemberWithoutPassword, 
        token 
      };
    } catch (error) {
      throw error;
    }
  }
}