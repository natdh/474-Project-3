const List = require('../model/list'), 
    Task = require('../model/task');
    
//////list//////
exports.getList = function(req,res,next){
    if (!req.body.listid) {
        return res.status(422).send({ error: 'No listid given.' });
    } else {
        for(var i = 0; i < req.user.lists.length; i++) {
            if(req.user.lists[i]._id == req.body.listid) {        
                var lst = req.user.lists[i];
                lst = List(lst);
                return res.json({list: lst.toJson()});
            }
        }
        return res.status(422).send({ error: 'No list of that id.'});
    }
}

exports.createList = function (req, res, next) {
    const desc = req.body.desc;
    const name = req.body.name;//required
    const paren = req.body.paren;
    const tasks = req.body.tasks;
    
    if (!name) {
        return res.status(422).send({ error: 'No name for list given.' });
    }
    
    let list = new List({
        desc: desc,
        name: name,
        paren: paren,
        tasks: tasks
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

exports.updateList = function(req,res,next){
    var lstidx = -1;
    if (!req.body.listid) {
        return res.status(422).send({ error: 'No listid given.' });
    } else {
        for(var i = 0; i < req.user.lists.length; i++) {
            if(req.user.lists[i]._id == req.body.listid) {        
                lstidx = i;
            }
        }
        if (lstidx == -1) {
            return res.status(422).send({ error: 'No list of that id.'});
        }
    }

    const desc = req.body.desc;
    const name = req.body.name; //required
    const paren = req.body.paren;
    const tasks = req.body.tasks;

    if (!name) {
        return res.status(422).send({ error: 'No name for list given.' });
    }
    
    let list = new List({
        _id: req.user.lists[lstidx]._id, //maintains old id
        desc: desc || req.user.lists[lstidx].desc,
        name: name,
        paren: paren || req.user.lists[lstidx].paren,
        tasks: tasks || req.user.lists[lstidx].tasks
    });
    
    req.user.lists.splice(lstidx, 1);
    req.user.lists.push(list);

    req.user.save(function (err, user) {
        if (err) { return next(err); }
        let listInfo = List(req.user.lists[lstidx]).toJson();
        return res.status(201).json({
            list: listInfo
        });
    });
}

exports.deleteList = function(req,res,next){
    if (!req.body.listid) {
        return res.status(422).send({ error: 'No listid given.' });
    } else {
        var lstidx = -1;
        for(var i = 0; i < req.user.lists.length; i++) {
          if(req.user.lists[i]._id == req.body.listid) {      
              lstidx = i;
          }
        }
        if (lstidx == -1) {
            return res.status(422).send({ error: 'No list of that id.'});
        } else {
            req.user.lists.splice(lstidx, 1);
            req.user.save(function (err, user) {
                if (err) { return next(err); }
                let userInfo = user.toJson();
                res.status(201).json({
                    deleted: true,
                    user: userInfo
                });
            });
        }
    }
}

//////task//////
exports.getTask = function(req,res,next){
    if (!req.body.listid || !req.body.taskid) {
        return res.status(422).send({ error: 'No listid or taskid given.' });
    } else {
        for(var i = 0; i < req.user.lists.length; i++) {
          if (req.user.lists[i]._id == req.body.listid) {        
            var lst = req.user.lists[i];
            lst = List(lst);
            for(var j = 0; i < req.user.lists.length; i++) {
                if (req.user.lists[i].tasks[j] == req.body.taskid) {        
                    var task = req.user.lists[i].tasks[j];
                    task = Task(lst);
                    return res.json({list: task.toJson()});
                }
            }
            return res.status(422).send({ error: 'No task of that id.' });
          }
        }
        return res.status(422).send({ error: 'No list of that id.' });
    }
}

//todo
exports.createTask = function(req,res,next){
    const details = req.body.details;
    const name = req.body.name;//required
    const dueDate = req.body.dueDate;
    const listid = req.body.listid;//required

    if (!name) {
        return res.status(422).send({ error: 'No name for task given.' });
    }
    
    var lstidx = -1;
    for(var i = 0; i < req.user.lists.length; i++) {
        if(req.user.lists[i]._id == req.body.listid) {        
            lstidx = i;
        }
    }
    if (lstidx == -1) {
        return res.status(422).send({ error: 'No list of that id.'});
    }
    
    let task = new Task({
        details: details,
        name: name,
        dueDate: dueDate
    });
    
    req.user.lists[lstidx].tasks.push(task);
    
    req.user.save(function (err, user) {
        if (err) { return next(err); }
        let taskInfo = task.toJson();
        res.status(201).json({
            task: taskInfo
        });
    });
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


