const express = require('express');
const router = express.Router();

let { allAuth } = require('../config/auth');

let {
    register,
    login,
    profile
} = require('../controllers/user_controller')

router.post('/register', register);

router.post('/login', login);

router.get('/profile', allAuth, profile);

module.exports = router;