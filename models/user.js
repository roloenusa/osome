const mongoose = require('mongoose');
const { UserRoles } = require('../services/user-roles');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  avatar: String,
  role: {
    type: 'string',
    enum: UserRoles,
    default: 'none',
  },
  method: {
    type: String,
    enum: ['google'],
    required: true,
  },
  google: {
    id: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    displayName: {
      type: String,
    },
  },
  preferences: {
    weight: {
      type: String,
      enum: ['lbs', 'kg'],
      default: 'kg',
    },
    length: {
      type: String,
      enum: ['m', 'inches'],
      default: 'm',
    },
    temp: {
      type: String,
      enum: ['f', 'c'],
      default: 'f',
    },
  },
}, {
  timestamps: true,
});

// Create a model
const User = mongoose.model('user', userSchema);

// Export the model
module.exports = User;
