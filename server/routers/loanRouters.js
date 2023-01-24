const router = require('express').Router();
const loanController = require("../controller/loanController")

router.post('/add', loanController.add)

module.exports = router;