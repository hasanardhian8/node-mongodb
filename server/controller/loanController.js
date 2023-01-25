const Loan = require("../models/loandb");
const upbook = require("../models/bookdb");


//save
module.exports.addloan = async (req, res) => {
    const { userid, loan, loandate, returndate } = req.body;
    try {
        const loan = await Loan.create({ userid, loan, loandate, returndate });
        res.status(201).json(loan);
      }
      catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
      }
}
//update book quantity
module.exports.updateloan = async (req, res) => {
  try {
      const updatedbook = await upbook.updateOne({_id:req.params.id}, {$set: req.body});
      res.status(200).json(updatedbook);
  } catch (error) {
      res.status(400).json({message: error.message});
  }
}