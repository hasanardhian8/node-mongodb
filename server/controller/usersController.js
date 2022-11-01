const User = require("../models/usersdb");

exports.signUp = async (req, res, next) => {
  const { email } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    return res.status(400).json({
      sucess: false,
      message: "email already exist",
    });
  }
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      sucess: true,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      sucess: false,
      message: error.message,
    });
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        sucess: false,
        message: "email and password are required",
      });
    }

    //check user email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        sucess: false,
        message: "invalid credentials",
      });
    }
    
    //verify password
    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return res.status(400).json({
        sucess: false,
        message: "invalid credentials",
      });
    }

    const token = await user.jwtGenerateToken();

    generateToken(user, 200, res);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      sucess: false,
      message: "cannot log in, check your credentials",
    });
  }
};

const generateToken = async (user, statusCode, res) => {
  const token = await user.jwtGenerateToken();

  const options = {
    httpOnly: true,
    //expired token
    expires: new Date(Date.now() + (60*24*3600000)),
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ sucess: true, token });
};


//logout
exports.logout = (req,res,next)=>{
  res.clearCookie("token");
  res.status(200).json({
    sucess: true,
    message:"logged out"
  })
}
