const Return = require("../models/returndb");
const upbook = require("../models/bookdb");

module.exports.addreturn = async (req, res) => {
    const { userid, returnbook } = req.body;
    try {
        const retbook = await Return.create({  userid, returnbook });
        res.status(201).json(retbook);
      }
      catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
      }
}

//update book quantity
module.exports.updatereturn = async (req, res) => {
  try {
      const updatedbook = await upbook.updateOne({_id:req.params.id}, {$set: req.body});
      res.status(200).json(updatedbook);
  } catch (error) {
      res.status(400).json({message: error.message});
  }
}