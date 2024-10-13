import { Schema, model } from 'mongoose';

// 1. Define a schema for storing user data in MongoDB
const userSchema = new Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  profilePic: String
});

// 2. Create a model from the schema for MongoDB operations
export const User2 = model('User2', userSchema);