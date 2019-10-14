const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

let {
    register,
    login,
    profile
} = require('../controllers/user_controller')

router.post('/register', register);

router.post('/login', login);

router.get('/profile', passport.authenticate('jwt', {
    session: false
}), profile);

module.exports = router;