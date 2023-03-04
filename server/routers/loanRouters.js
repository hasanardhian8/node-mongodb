const router = require('express').Router();
const loanController = require("../controller/loanController")

router.post('/addloan', loanController.addLoan)
router.get('/loan', loanController.get)

module.exports = router;