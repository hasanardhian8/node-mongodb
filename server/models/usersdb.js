const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      required: true,
      default:0,
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

//verify password
usersSchema.methods.comparePassword = async function(yourPassword){
  return await bcrypt.compare(yourPassword, this.password);
}

//get the token
usersSchema.methods.jwtGenerateToken = function(){
  return jwt.sign({id:this.id},process.env.JWT_SECRET,{
    expiresIn : 3600
  });
}

module.exports = mongoose.model("usersdb",usersSchema);