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
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Poem = mongoose.model(PoemSchema, 'Poem');

module.exports = Poem;
