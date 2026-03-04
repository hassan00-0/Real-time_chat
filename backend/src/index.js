import express from "express";
import authRouter from "./routes/auth.route.js";
import dotenv from "dotenv";
import connectDb from "./lib/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log("listening on port 5000.");
  connectDb();
});
