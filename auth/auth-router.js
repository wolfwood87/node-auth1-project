const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/user-model.js');

router.post('/register', (req, res) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash

    Users.add(user)
        .then(newuse => {
            res.status(201).json(newuse);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.loggedin = true;
                res.status(200).json({ message: `Welcome back ${user.username}!`})
            }
            else {
                res.status(401).json({message: 'You shall not pass!'})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        });
});

router.delete('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if(err) {
                res.status(400).json({message: "error on logout"})
            }
            else {
                res.status(204).json({message: "Thank you! Come back soon!"})
            }
        })
    }
    else {
        res.end();
    }
});

module.exports = router;