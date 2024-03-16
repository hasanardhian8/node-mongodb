const mongoose = require("mongoose");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const redis = require("redis");

//import routes
const authRouters = require("./routers/authRouters");
const bookRouter = require("./routers/bookRouters");
// const loanRouter = require("./routers/loanRouters");
// const returnRouter = require("./routers/returnRouters");
// const { requireAuth, checkUser } = require("./middleware/auth");

//connect database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected db"))
  .catch((err) => {
    console.log(err);
  });

// MIDDLEWARE
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    limit: "100mb",
    extended: true,
  })
);
app.use(cookieParser());
app.use(cors());
const rediscl = redis.createClient();

rediscl.on("connect", () => {
  console.log("redis running");
});

// ROUTES MIDDLEWARE
app.use("/api", authRouters);
app.use("/api", bookRouter);

//ERROR MIDDLEWARE
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log("running");
});
