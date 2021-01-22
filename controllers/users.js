const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    signup: (req, res, next) => {
        User.find({email: req.body.email}).exec()
        .then(user => {
            if(user.length >= 1) {
                return res.status(409).json({
                    message: 'Email already exists!'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err) {
                        return res.status(500).json({
                            error: err.message
                        })
                    } else {
                        const user = new User({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: hash
                        })
                        user.save()
                        .then(result => {
                            console.log(result);
                            res.status(201).json({
                                message: "User created successfully"
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            })
                        });
                    }
                })
            }
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
    },
    getUsers: (req, res, next) => {
        User.find({role: 'regular'})
        .then(docs => {
            const response = {
                count: docs.length,
                users: docs
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err.message
            })
        });
    },
    login: (req, res, next) => {
        User.find({email: req.body.email}).exec()
        .then(user => {
            if(user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if(err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    })
                }
                if(result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id,
                        role: user[0].role
                    }, process.env.JWT_KEY, {
                        expiresIn: '1h'
                    });
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token
                    });
                } else {
                    res.status(401).json({
                        message: 'Auth failed'
                    })
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
    }
}
