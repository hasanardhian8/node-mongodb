const Loan = require("../models/loandb");

module.exports.get = async (req, res) => {
  try {
    const getloan = await Loan.find();
    res.status(201).json(getloan);
  } catch (err) {
    //const errors = handleErrors(err);
    res.status(400).json("error");
  }
};

//save
module.exports.addLoan = async (req, res) => {
  const { userid,loan } = req.body;
  try {
    const adloan = await Loan.create({
      userid,loan
    });
    res.status(201).json(adloan);
  } catch (err) {
    //const errors = handleErrors(err);
    res.status(400).json("error");
  }
};
