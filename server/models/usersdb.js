const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const usersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
       required : [true, 'Please add a Username'],
       maxlength: 32
    },
    email: {
      type: String,
       trim: true,
       required : [true, 'Please add a E-mail'],
       unique: true,
       match: [
           /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
           'Please add a valid E-mail'
       ]
    },
    password: {
      type: String,
       trim: true,
       required : [true, 'Please add a Password'],
       minlength: [6, 'password must have at least six(6) characters'],
       match: [
           /^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]+$/,
           'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and a special characters'
       ]
    },
    role: {
      type: Number,
      default:2,
      //0=admin, 1=manager, 2=user
    },
  },
  { timestamps: true }
);

//encrypting password before saving
usersSchema.pre("save", async function(next){
  if (!this.isModified("password")) {
    next()
  }
  this.password = await bcrypt.hash(this.password, 10);
})

// verify password
usersSchema.methods.comparePassword = async function(yourPassword){
  return await bcrypt.compare(yourPassword, this.password);
}

// get the token
usersSchema.methods.jwtGenerateToken = function(){
  return jwt.sign({id: this.id}, process.env.JWT_SECRET, {
      expiresIn: 3600
  });
}

module.exports = mongoose.model("usersdb",usersSchema);
