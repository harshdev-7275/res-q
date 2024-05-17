import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import adminRoutes from "./routes/adminRoutes.js"
import authRoutes from "./routes/authRoutes.js"
dotenv.config()

const app = express()
const PORT = process.env.PORT;
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.use("/api/admin" ,adminRoutes)
app.use("/api/auth", authRoutes)





app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))