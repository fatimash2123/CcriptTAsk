const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/authentication");
const appoitmentRouter = require("./routes/appointments");
const { errorHandler } = require("./middlewares/errorHandling");

const app = express();

app.use(cors())
app.use(express.json());
app.use("/api/appointments", appoitmentRouter);
app.use("/api", userRouter);


//error handling middlewares
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("server listening on 8080");
});
