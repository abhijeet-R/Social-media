const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors")
const cloudinary = require("cloudinary")

const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const conversationRouter = require("./routes/conversation");
const messageRouter = require("./routes/message");

dotenv.config({ path: "./config/.env" });
const Port = process.env.Port || 5000;

mongoose.connect(process.env.mongo_url).then(() => {
  console.log("database connected");
});

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors({
  origin: 'http://localhost:3000',
}))

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
})

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/conversation", conversationRouter);
app.use("/api/message", messageRouter);


app.listen(Port, () => {
  console.log("server listening on port : ", Port);
});
