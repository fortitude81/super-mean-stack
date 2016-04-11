var mongoose = require('mongoose');
var Todo = require('server/db/db').Todo;
var express = require('express');
var router = express.Router();

router.get('/:username', function(req, res) {
    Todo.find( { $or: [{ "ownerUserID": req.params.username}, {"assignUserID": req.params.username }] }, function(err, results) {
        if (err) { console.log(err); }
        res.send({ todos: results });
    });
});

router.post('/', function(req, res) {
    var todo = new Todo(req.body);
    todo.save(function(err) {
        if (err) { console.log(err); }

        res.send('ToDo saved');
    });
});

router.put('/:id', function(req, res) {
    var id = req.params.id;
    Todo.update({ _id: mongoose.Types.ObjectId(id) }, {
        $set: { task: req.body.task }
    }, function(err) {
        if (err) { console.log(err); }

        res.send('ToDo updated');
    });
});

router.put('/assign/:id', function(req, res) {
    var id = req.params.id;
    Todo.update({ _id: mongoose.Types.ObjectId(id) }, {
        $set: { assignUserID: req.body.assignUserID }
    }, function(err) {
        if (err) { console.log(err); }

        res.send('ToDo updated');
    });
});

router.delete('/:id', function(req, res) {
    var id = req.params.id;
    Todo.remove({ _id: mongoose.Types.ObjectId(id) }, function(err) {
        if (err) { console.log(err); }

        res.send('ToDo deleted');
    });
});

module.exports = router;
