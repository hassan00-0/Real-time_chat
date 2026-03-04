import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongodb.");
  } catch (error) {
    console.log(`an error occured ${error}`);
    process.exit(1);
  }
};

export default connectDb;
