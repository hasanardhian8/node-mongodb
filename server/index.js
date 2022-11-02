const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//import routes
const userRoute = require('./routers/usersRouters');
//const authRoute = require('./routers/authRouters');

dotenv.config();
const app = express();

//connect database
mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>console.log("connected db"))
    .catch((err)=>{console.log(err);})

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//app.use("/api/auth", authRoute);
app.use("/api", userRoute);

app.listen(process.env.PORT || 5000, ()=>{
    console.log("running");
    });