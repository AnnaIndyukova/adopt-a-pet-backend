require("dotenv").config(); // + create .env file on the server!
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const helmet = require("helmet");

const mainRouter = require("./routes/index");
const limiter = require("./middlewares/rate-limit");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3000 } = process.env;
const { DB_ADDRESS } = require("./utils/config");

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(limiter);

mongoose
  .connect(DB_ADDRESS)
  .then(() => {
    console.log("Connnected to DB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.use(requestLogger);
app.use("/", mainRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, (error) => {
  if (error) {
    console.log(`Error: ${error}`);
  }
  console.log(`Server is running on port ${PORT}`);
});
