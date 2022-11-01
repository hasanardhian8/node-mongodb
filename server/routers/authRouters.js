const router = require("express").Router();
const User = require("../models/usersdb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const tokenVerifyMidd = require("../middleware/verifyToken");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const user = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });
    const users = await user.save();
    !users && res.status(404).send("not created");

    res.status(201).send("user has been created");
  } catch (err) {
    res.status(500).json(err);
  }
});

const accesTkn = (id)=>{
  return jwt.sign({userId : id},process.env.ACCES_TOKEN_SECRET,{expiresIn:'3d'});
}

const refreshTkn = (id)=>{
  return jwt.sign({userId : id},process.env.REFRESH_TOKEN_SECRET);
}


//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");

    const comPass = await bcrypt.compare(req.body.password, user.password);
    !comPass && res.status(400).json("wrong password");

    const token = accesTkn(user._id);
    const Refresh_token = refreshTkn(user._id);

    res.status(200).json({user,token,Refresh_token});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/home",tokenVerifyMidd,(req,res)=>{
  res.status(200).json("welcome to  home page")
});



module.exports = router;
