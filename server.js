const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user-routes");
const visitorRouter = require("./routes/visitor-routes");
const cookieParser = require("cookie-parser");
const moment = require('moment-timezone');
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/visitor", visitorRouter);

moment.tz.setDefault('Africa/Nairobi');

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(5000);
    console.log("Database is connected! Listening to localhost 5000");
  })
  .catch((err) => console.log(err));


