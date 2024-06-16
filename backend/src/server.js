import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import adminRoutes from "./routes/adminRoutes.js";
import generalRoutes from "./routes/generalRoutes.js";

import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = 5005;
app.use(
  cors({
    origin: "http://localhost:3000", // Ensure this is correct
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/general", generalRoutes);


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
