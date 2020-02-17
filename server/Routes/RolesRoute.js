const express = require('express');
const router = express.Router();
const Roles = require('../Models/Roles');

router.get('/roles', (req, res, next) => {
    Roles.find({}).then(roles => {
        res.send({ Roles: roles });
    });
});

router.post('/role', (req, res, next) => {
    Roles.find({ _id: req.body._id }).then(role => {
        res.send({ Role: role });
    });
});
router.post('/role-name', (req, res, next) => {
    Roles.find({ role_name: req.body.role_name }).then(role => {
        res.send({ Role: role });
    });
});

module.exports = router;