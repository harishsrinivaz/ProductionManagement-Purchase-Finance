const express = require('express');
const router = express.Router();
const Users = require('../Models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            console.log(info);
            return res.json({ message: [info.msg, info.message] });
        }
        res.json(user);
    })(req, res, next);
});

module.exports = router;