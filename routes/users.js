const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const catchAsync = require('../utils/catch');

const users = require('../controllers/users');

router.get('/register', users.renderRegister);

router.post('/register', catchAsync(users.userRegister));

router.get('/login', users.renderLogin);

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.userLogin);

router.get('/logout', users.userLogout);

module.exports = router;
