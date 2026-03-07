import express from "express";
import authRouter from "./routes/auth.route.js";
import dotenv from "dotenv";
import connectDb from "./lib/db.js";
import cookieParser from "cookie-parser";
import { getMessages } from "./controllers/message.controller.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;

// to be able to read json
app.use(express.json());
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
app.use("/api/messages", getMessages);

app.listen(port, () => {
  console.log("listening on port 5000.");
  connectDb();
});
