const List = require('../model/list'), 
    Task = require('../model/task'); 
    
exports.getList = function(req,res,next){
    if (!req.body.listid) {
        return res.status(422).send({ error: 'No listid given.' });
    } else if (!req.user.lists[req.body.listid]) {
        return res.status(422).send({ error: 'No list of that id.' });
    } else {
        res.json({list: req.user.lists[req.body.listid].toJson()});
    }
}

exports.createList = function (req, res, next) {
    const desc = req.body.desc;
    const name = req.body.name;//required
    const paren = req.body.paren;
    const tasks = req.body.tasks;
    
    if (!name) {
        return res.status(422).send({ error: 'No name for task given.' });
    }
    
    let list = new List({
        desc: desc,
        name: name,
        paren: paren,
        tasks: {}
    });
    req.user.lists.push(list);
    
    req.user.save(function (err, user) {
        if (err) { return next(err); }
        let listInfo = list.toJson();
        res.status(201).json({
            list: listInfo
        });
    });
}
//todo
exports.updateList = function(req,res,next){
    return res.status(200).json({stub:'stub'});
}
//todo
exports.deleteList = function(req,res,next){
    return res.status(200).json({stub:'stub'});
}

exports.getTask = function(req,res,next){
    if (!req.body.listid || !req.body.taskid) {
        return res.status(422).send({ error: 'No listid or taskid given.' });
    } else if (!req.user.lists[req.body.listid]) {
        return res.status(422).send({ error: 'No list of that id.' });
    } else if (!req.user.lists[req.body.listid].tasks[req.body.taskid]) {
        return res.status(422).send({ error: 'No task of that id.' });
    } else {
        res.json({list: req.user.lists[req.body.listid].tasks[req.body.taskid].toJson()});
    }
}
//todo
exports.createTask = function(req,res,next){
    return res.status(200).json({stub:'stub'});
}
//todo
exports.updateTask = function (req, res, next) {
    const name = req.body.name;
    const dueDate = req.body.dueDate;
    const details = req.body.details;
    let task = req.body.task;

    //not sure what to actually return
    let taskInfo = task.toJson();    
    return res.status(200).json({
        validated: true,
        task: taskInfo
    })
}
//todo
exports.deleteTask = function (req, res, next) {
    const task = req.body.task;

    return res.status(200).json({
        task: null
    })
}


