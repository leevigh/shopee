var express = require('express');
var router = express.Router();
var userCont = require('../controllers/users');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.json({users: [{name: 'Timmy'}]});
// });
router.get('/', userCont.getUsers);
router.post('/signup', userCont.signup);
router.post('/login', userCont.login);

module.exports = router;
