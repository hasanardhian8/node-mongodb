const Book = require("../models/bookdb");

module.exports.get = async (req, res) => {
  try {
    const book = await Book.find();
    res.status(201).json(book);
  } catch (err) {
    //const errors = handleErrors(err);
    res.status(400).json("error");
  }
};

module.exports.add = async (req, res) => {
  const { title, desc, category, publisher, author, quantity, img } = req.body;
  try {
    const book = await Book.insert({
      title,
      desc,
      category,
      publisher,
      author,
      quantity,
      img,
    });
    res.status(201).json(book);
  } catch (err) {
    //const errors = handleErrors(err);
    res.status(400).json("error");
  }
};

module.exports.update = async (req, res) => {
  //var  upQuantity = req.body.quantity;
  try {
    //await Book.updateOne({_id: req.body.santriId}, {nama:req.body.nama})
    const book = await Book.updateOne(
      { _id: req.params.id },
      { quantity: req.body.quantity }
    );
    res.status(201).json(book);
  } catch (err) {
    //const errors = handleErrors(err);
    res.status(400).json("error");
  }
};
