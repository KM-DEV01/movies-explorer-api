const router = require('express').Router();
const { createUser } = require('../controllers/users');
const { auth, logout } = require('../controllers/auth');
const { signInValidator, signUpValidator } = require('../validators/user-validator');

router.post('/signin', signInValidator, auth);
router.post('/signup', signUpValidator, createUser);
router.post('/logout', require('../middlewares/auth'), logout);

module.exports = router;
