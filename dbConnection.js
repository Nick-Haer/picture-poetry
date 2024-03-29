const mongoose = require('mongoose');

//connect to the remote mongodb DB when deployed, and local in development
async function dbConnect() {
  try {
    console.log('connecting...');
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost/picturepoetryDB',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    );
    console.log('db connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = dbConnect;
