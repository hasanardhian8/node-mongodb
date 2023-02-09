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
      type: String,
    },
    publisher: {
      type: String,
    },
    author: {
      type: Array,
    },
    quantity: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("bookdb", bookSchema);
