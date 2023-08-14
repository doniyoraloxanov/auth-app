import mongoose from "mongoose";
const MONGO_URI =
    "mongodb+srv://task4:task4@cluster0.ull7nrm.mongodb.net/task4?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        const con = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB connected: ${con.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
