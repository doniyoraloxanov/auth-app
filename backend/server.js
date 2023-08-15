import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
const port = process.env.PORT || 8000;

// Connect to database
connectDB();

//******************* MIDDLEWARES ***********************/
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//******************* ROUTES ***********************/

app.use("/", (req, res) => {
    res.send("Hello World Lola");
});

app.use("/api/users", userRoutes);

//******************* SERVER ***********************/
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
