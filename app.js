const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/authentication");
const appoitmentRouter = require("./routes/appointments");
const { errorHandler } = require("./middlewares/errorHandling");

const app = express();

const mongoURL = process.env.MONGODB_URL;
mongoose
  .connect(mongoURL)
  .then((res) => {
    //console.log(res)
    console.log("connection success");
  })
  .catch((err) => {
    console.log("connection error", err);
  });

app.use(cors({
  origin: "http://localhost:3000",
}))
app.use(express.json());
app.use("/api/appointments", appoitmentRouter);
app.use("/api", userRouter);


//error handling middlewares
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("server listening on 8080");
});
