import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
const port = process.env.PORT || 8000;

// Connect to database
connectDB();

const app = express();

//******************* MIDDLEWARES ***********************/
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running....");
});

// server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
