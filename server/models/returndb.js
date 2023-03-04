const mongoose = require("mongoose");

const returnSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
      //unique: true,
    },
     returnbook: [{
        bookid:String
      }],
    //get date return
    //date+7
  },
  { timestamps: true }
);

module.exports = mongoose.model("returndb", returnSchema);