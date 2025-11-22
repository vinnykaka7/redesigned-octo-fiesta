import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI="mongodb+srv://:ngatiavincent6_db_user:kaka456@cluster0.abcde.mongodb.net/OrganDonationDB?retryWrites=true&w=majority");
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
