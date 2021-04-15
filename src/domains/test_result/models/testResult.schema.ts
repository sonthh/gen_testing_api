import { ObjectId } from 'mongodb';
import * as mongoose from 'mongoose';
import { Users } from 'src/domains/users/models/users.schema';

export const TestResults = 'TestResults';

export const TestResultSchema = new mongoose.Schema({
  results: [
    {
      result: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
  recommends: [
    {
      recommend: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
  gens: [
    {
      name: {
        type: String,
        required: false,
      },
      type: {
        type: String,
        required: true,
      },
      property: {
        type: String,
        required: true,
      },
      affect: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: ObjectId,
    ref: Users,
    required: true,
  },
});

TestResultSchema.pre('findOneAndUpdate', function () {
  this.update({}, { updatedAt: Date.now() });
});
