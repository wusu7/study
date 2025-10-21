import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import postRoutes from "./routes/post.routes.js";

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use("/api/v1/posts", postRoutes);

app.listen(3000, () => console.log("Server is running on port 3000"));