const router = require('express').Router();
const returnController = require("../controller/returnController")

router.post('/addreturn', returnController.addReturn);
router.get('/return', returnController.getReturn);


module.exports = router;