import mongoose from "mongoose";

const userName = "sona";
const password = encodeURIComponent("son@r@i");
const databaseName = "ProNetflix";

const dbURL = `mongodb+srv://${userName}:${password}@cluster0.2kihbrb.mongodb.net/${databaseName}?retryWrites=true&w=majority&appName=Cluster0`;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("DB connection establish..........");
  } catch (error) {
    console.log(error.message);
    console.log("DB connection failed.........");
  }
};

export default connectDB;
