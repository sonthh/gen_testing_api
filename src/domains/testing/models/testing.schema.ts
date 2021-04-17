import { ObjectId } from 'mongodb';
import * as mongoose from 'mongoose';
import { Users } from 'src/domains/users/models/users.schema';

export const Testings = 'Testings';

export const TestingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  results: [
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      numberGen: {
        type: Number,
        required: true,
      },
      gen: [
        {
          type: String,
          required: true,
        },
      ],
    },
  ],
  patient: {
    type: ObjectId,
    ref: Users,
    required: true,
  },
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

TestingSchema.pre('findOneAndUpdate', function () {
  this.update({}, { updatedAt: Date.now() });
});
