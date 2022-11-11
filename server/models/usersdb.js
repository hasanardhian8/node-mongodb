const mongoose = require("mongoose");
const { isEmail } = require('validator');
const bcrypt = require("bcrypt");

const usersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, 'please enter an email'],
      unique: true,
      validate:[isEmail,'please enter a valid email']
    },
    password: {
      type: String,
      required: [true, 'please enter an password'],
      minLength:[6,'minimum password length is 6 character']
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

usersSchema.statics.login= async function(email,password){
  const user = await this.findOne({email});
  if (user) {
    const auth = await bcrypt.compare(password,user.password);
    if (auth) {
      return user
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

 const User = mongoose.model("usersdb",usersSchema);
 module.exports = User