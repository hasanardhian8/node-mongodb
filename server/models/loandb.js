const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    loan: [{
      bookid:String
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("loandb", loanSchema);
