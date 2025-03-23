import mongoose from 'mongoose';

export const connectDatabase = async () => {
  try {
    if (!process.env.MONGODB_URI) throw new Error('Invalid environment variables');
    
    const db = await mongoose.connect(process.env.MONGODB_URI);
    if (process.env.ENVIRONMENT === 'development') {
      console.log(`Database connected: ${db.connection.host}:${db.connection.port}/${db.connection.name}`);
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
