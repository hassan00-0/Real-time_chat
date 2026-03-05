import express from "express";
import authRouter from "./routes/auth.route.js";
import dotenv from "dotenv";
import connectDb from "./lib/db.js";
import cookieParser from "cookie-parser";
import { getMessages } from "./controllers/message.controller.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/messages", getMessages);
app.listen(port, () => {
  console.log("listening on port 5000.");
  connectDb();
});
