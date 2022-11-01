const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      //unique: true
    },
    desc: {
      type: String,
    },
    category: {
      type: Array,
    },
    publisher: {
        type: String,
        required: true,
    },
    author: {
        type: Array,
        required: true,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("bookdb.js",bookSchema)