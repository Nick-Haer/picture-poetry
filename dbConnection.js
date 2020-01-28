const mongoose = require('mongoose');

async function dbConnect() {
  try {
    await mongoose.connect('mongodb://localhost/picturepoetryDB', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('db connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = dbConnect;