const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PoemSchema = new Schema({
  title: {
    type: String,
    default: 'Untitled',
  },
  text: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  likes: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      date: { type: Date, default: Date.now() },
    },
  ],
});

const Poem = mongoose.model('Poem', PoemSchema);

module.exports = Poem;
