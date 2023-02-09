const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");

//import routes
const authRouters = require('./routers/authRouters');
const bookRouter = require('./routers/bookRouters');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

dotenv.config();
const app = express();

//connect database
mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>console.log("connected db"))
    .catch((err)=>{console.log(err);})

//middleware
app.use(express.json());
app.use(cookieParser());

app.get('*', checkUser);
app.get('/', (req, res) => res.send('home'));
app.get('/masuk', requireAuth, (req, res) => res.send('halaman pesanan'));

app.use(authRouters);
app.use(bookRouter);


app.listen(process.env.PORT || 5000, ()=>{
    console.log("running");
    });