const mongoose = require("mongoose");

const connection = process.env.MONGO_URI || 'mongodb://localhost:27018/mydb';

const connectDb = () => {
  return mongoose.connect(connection);
};

module.exports = connectDb;
