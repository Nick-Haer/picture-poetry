const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Schema for user accounts
//Anyone can view poems, but only users can save or post poetry
const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  myPoems: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Poem',
    },
  ],
  savedPoems: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Poem',
    },
  ],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
