const express = require('express');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/CatchAsync');
const passport = require('passport');
const { storerReturnTo } = require('../middleware');
const users = require('../controllers/users');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.createUser));

router.route('/login')
    .get(users.renderLogin)
    .post(storerReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.loginUser);

router.get('/logout', users.logoutUser);

module.exports = router;