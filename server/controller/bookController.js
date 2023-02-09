const Book = require("../models/bookdb");

module.exports.add = async (req, res) => {
    const { title, desc, category, publisher, author, quantity, img } = req.body;
    try {
        const book = await Book.insertOne({ title, desc, category, publisher, author, quantity, img });
        res.status(201).json(book);
      }
      catch(err) {
        //const errors = handleErrors(err);
        res.status(400).json("error");
      }
}

module.exports.updatebook = async (req, res) => {
  const { title, desc, category, publisher, author, quantity, img } = req.body;
  try {
      const book = await Book.insertOne({ title, desc, category, publisher, author, quantity, img });
      res.status(201).json(book);
    }
    catch(err) {
      //const errors = handleErrors(err);
      res.status(400).json("error");
    }
}
