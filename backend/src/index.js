import express from "express";
import authRouter from "./routes/auth.route.js";
import dotenv from "dotenv";
import connectDb from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import messageRoutes from "./routes/message.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

// to be able to read json
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

// be able to use cookies as js objects, like req.cookies
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// routes
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRoutes);

app.listen(port, () => {
  console.log("listening on port 5000.");
  connectDb();
});
