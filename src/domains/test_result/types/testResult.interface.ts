import { ObjectId } from 'bson';
import { Types, Document } from 'mongoose';
import { User } from '../../users/types/users.interface';

interface Result {
  result?: string;
  content?: string;
}

interface Recommend {
  recommend?: string;
  content?: string;
}

interface Gen {
  name?: string;
  type?: string;
  property?: string;
  affect?: string;
  content?: string;
}

export interface TestResult extends Document {
  results: Result[];
  recommends: Recommend[];
  gens: Gen[];
  createdAt: string;
  updatedAt: string;
  createdBy: Types.ObjectId;
}

export interface CreateOneTestResult {
  results?: Result[];
  recommends?: Recommend[];
  gens?: Gen[];
}

export interface CreateOneService {
  createOneTestResult: CreateOneTestResult;
  user: User;
}

export interface FindOneService {
  query: any;
}

export interface FindManyQuery {
  sortBy?: string;
  createdAt?: string;
  sortDirection?: string;
  limit?: string;
  cursor?: string;
}

export interface FindManyService {
  query: FindManyQuery;
}

export interface FindManyTestResultResponse {
  total: number;
  list: TestResult[];
  cursor: string;
}

export interface UpdateTestResultService {
  query: any;
  updateOneTestResult: UpdateOneTestResult;
}

export interface UpdateOneTestResult {
  results?: Result[];
  recommends?: Recommend[];
  gens?: Gen[];
}

export interface DeleteOneService {
  query: {
    _id: ObjectId;
  };
}
