const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
      //unique: true,
    },
    loan: [
      {
        bookid:{
            type:String,
        },
        quantity:{
            type:Number,
            default:1,
        }
      },
    ],
    loandate:{
      type: Date,
      //default: Date.now
    },
    returndate:{
      type: Date,
      //default: ()=>new Date(+new Date() + 7*24*60*60*1000)
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("loandb.js", loanSchema);
