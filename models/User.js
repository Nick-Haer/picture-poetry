const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  poems: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Poem',
    },
  ],
});

const User = mongoose.model(UserSchema, 'User');

module.exports = User;
