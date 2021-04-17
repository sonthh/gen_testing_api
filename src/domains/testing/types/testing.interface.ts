import { Types, Document } from 'mongoose';
import { User } from '../../users/types/users.interface';

export interface SubTesting {
  name: string;
  description: string;
  numberGen: number;
  gen: string[];
}

export interface Testing extends Document {
  name: string;
  results: SubTesting[];
  patient: Types.ObjectId;
  createdBy: Types.ObjectId;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOneTesting {
  name: string;
  patient: string;
  results: SubTesting[];
}

export interface CreateOneService {
  createOneTesting: CreateOneTesting;
  user: User;
}

export interface FindOneService {
  query: any;
}

export interface FindManyQuery {
  name?: string;
  patient?: string;
  createdBy?: string;
  sortBy?: string;
  createdAt?: string;
  sortDirection?: string;
  limit?: string;
  cursor?: string;
}

export interface FindManyService {
  query: FindManyQuery;
}

// export interface FindManyTestResultResponse {}

export interface UpdateTestResultService {
  query: any;
  updateOneTestResult: any;
}

// export interface UpdateOneTestResult {}
