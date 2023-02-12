import { model, Schema } from 'mongoose';

export const User = model('User', new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['WAITER', 'ADMIN'],
    default: 'WAITER',
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}));
