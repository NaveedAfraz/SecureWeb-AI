// connectDB.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME || 'cyberscan',
      // useNewUrlParser: true,  <-- REMOVE THIS LINE
      // useUnifiedTopology: true, <-- REMOVE THIS LINE
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;