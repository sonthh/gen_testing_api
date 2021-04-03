import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema(
  {
    username: String,
    fullname: String,
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
    },
    password: String,
    status: { type: String, enum: ['INACTIVE', 'ACTIVE'], default: 'INACTIVE' },
    profilePhoto: String,
    role: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collation: { locale: 'en', strength: 2 },
  },
);

UsersSchema.pre('findOneAndUpdate', function () {
  this.update({}, { updatedAt: Date.now() });
});

UsersSchema.pre('updateMany', function () {
  this.update({}, { updatedAt: Date.now() });
});
