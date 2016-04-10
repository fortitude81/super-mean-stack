var mongoose = require('mongoose');
var User = require('server/db/db').User;
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    User.find({}, 'userName', function (err, users) {
        if (err) {
            res.send(err, false);
        } else {
            res.send(false, users);
        }
    });
});

router.post('/loggedin', function(req, res) {
    var reqUser = req.body;
    if(req.session['User']  && req.session['User'].name == reqUser.name) {
        res.json(req.session['User']);
    } else {
        res.send('User is not loggedin!');
    }
});

router.post('/logout', function(req, res) {
    delete req.session['User'];
    res.send('User Logout Successfully!');
});

router.post('/login', function(req, res) {
    var reqUser = req.body;
    User.findOne({ userName: reqUser.userName }, function (err, user) {
        if (err) {
            res.send(err);
        }
        else if (user !== null) {
            if (reqUser.passWord === user.passWord) {
                req.session['User'] = {};
                req.session['User'].name = user.userName;
                req.session['User'].role = user.role;
                res.send({
                    message: 'User Login Successfully!',
                    data: req.session['User']
                });
            }
        }
        else {
            res.send('No Users Found!');
        }
    });
});

router.post('/register', function(req, res) {
    var newUser = req.body;
    newUser.role = 'MEMBER';
    User.findOne({ userName: newUser.userName }, function (err, user) {
        if (err) {
            res.send(err);
        }
        else if (user === null || user === undefined) {
            User.create(newUser, function (err) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send('User Created Successfully!');
                }
            });
        }
        else if (user.userName === newUser.userName) {
            res.send('User Already Exits!');
        }
    });
});

module.exports = router;
