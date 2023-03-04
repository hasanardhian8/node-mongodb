const Return = require("../models/returndb");

module.exports.getReturn = async (req, res) => {
  try {
    const gret = await Return.find();
    res.status(201).json(gret);
  } catch (err) {
    //const errors = handleErrors(err);
    res.status(400).json("error");
  }
};
module.exports.addReturn = async (req, res) => {
    const { userid, returnbook } = req.body;
    try {
        const retbook = await Return.create(
          {  userid, returnbook }
          );
        res.status(201).json(retbook);
      }
      catch(err) {    
        res.status(400).json("error");
      }
}
