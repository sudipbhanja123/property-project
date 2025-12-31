import mongoose from "mongoose";

let connected = false;
export const connectDB = async () => {
  mongoose.set("strictQuery", true);

  // if the database is already connected, we don't need to connect again
  if (connected) {
    console.log("Already connected to database");
    return;
  }
  // connect to the database
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    connected = true;
  } catch (error) {
    console.log("Error connecting to database:", error);
  }
};
