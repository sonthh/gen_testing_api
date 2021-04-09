import { Document, Types } from 'mongoose';

export interface User extends Document {
  username: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  password: string;
  profilePhoto: string;
  status: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetCurrentUserCredentials {
  email?: string;
  username?: string;
  _id?: Types.ObjectId;
}

export interface CreateOneUser {
  username: string;
  fullname: string;
  email: string;
  phoneNumber?: string;
  password: string;
  profilePhoto?: string;
  status?: string;
  role?: string;
}

export interface CreateOneService {
  user: CreateOneUser;
}
