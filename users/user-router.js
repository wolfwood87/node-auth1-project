const router = require('express').Router();

const Users = require('./users-model.js');
const bcrypt = require('bcryptjs')
const restricted = require('./restricted.js');

router.get('/', restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.status(201).json(users)
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

module.exports = router;