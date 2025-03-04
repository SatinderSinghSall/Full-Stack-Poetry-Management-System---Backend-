const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected Successfully!`);
    console.log(`📊 Database Host: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌  MongoDB NOT connected - Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
