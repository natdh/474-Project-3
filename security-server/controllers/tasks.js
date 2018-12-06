const List = require('../model/list'), 
    Task = require('../model/task');
    
//////list//////
exports.getList = function(req,res,next){
    if (!req.body.listid) {
        return res.status(422).send({ error: 'No listid given.' });
    } else {
        if (req.user.lists === undefined || req.user.lists.length == 0) {
            return res.status(422).send({ error: 'No lists.'});
        }
        req.user.lists = JSON.parse(req.user.lists);
        for(var i = 0; i < req.user.lists.length; i++) {
            if(req.user.lists[i]._id == req.body.listid) {        
                var lst = List(req.user.lists[i]);
                return res.json({
                    list: lst.toJson()
                });
            }
        }
        return res.status(422).send({ error: 'No list of that id.'});
    }
}

exports.createList = function (req, res, next) {
    const desc = req.body.desc;
    const name = req.body.name;//required
    const tasks = req.body.tasks;
    
    if (!name) {
        return res.status(422).send({ error: 'No name for list given.' });
    }
    
    let list = new List({
        desc: desc,
        name: name,
        tasks: tasks
    });
    
    if (req.user.lists != undefined && req.user.lists.length > 0) {
        req.user.lists = JSON.parse(req.user.lists);
    }
    req.user.lists.push(list);
    req.user.lists = JSON.stringify(req.user.lists);
    req.user.save(function (err, user) {
        if (err) { return next(err); } 
        //req.user.lists = JSON.parse(req.user.lists);
        let listInfo = list.toJson();
        let userInfo = req.user.toJson();
        res.status(201).json({
            list: listInfo, 
            user: userInfo
        });
    });
}

exports.updateList = function(req,res,next){
    const desc = req.body.desc;
    const name = req.body.name;
    const tasks = req.body.tasks;
    
    if (!req.body.listid) {
        return res.status(422).send({ error: 'No listid given.' });
    } 
    
    if (req.user.lists === undefined || req.user.lists.length == 0) {
        return res.status(422).send({ error: 'No lists.'});
    }
    req.user.lists = JSON.parse(req.user.lists);
    var lstidx = -1;
    for(var i = 0; i < req.user.lists.length; i++) {
        console.log("lstidx " + i + " " + req.user.lists[i]._id);
        if(req.user.lists[i]._id == req.body.listid) {      
            lstidx = i;
            console.log("lstidx! " + i);
            break;
        }
    }
    if (lstidx == -1) {
        return res.status(422).send({ error: 'No list of that id.'});
    }
    
    let list = new List({
        _id: req.user.lists[lstidx]._id, //maintains old id
        desc: desc   != undefined ? desc : req.user.lists[lstidx].desc,
        name: name   != undefined ? name : req.user.lists[lstidx].name,
        tasks: tasks != undefined ? tasks : req.user.lists[lstidx].tasks
    });
    
    req.user.lists.splice(lstidx, 1);
    req.user.lists.push(list);
    req.user.lists = JSON.stringify(req.user.lists);
    req.user.save(function (err, user) {
        if (err) { return next(err); }
        //req.user.lists = JSON.parse(req.user.lists);
        let listInfo = list.toJson();
        let userInfo = req.user.toJson();
        return res.status(201).json({
            list: listInfo, 
            user: userInfo
        });
    });
}

exports.deleteList = function(req,res,next){
    if (!req.body.listid) {
        return res.status(422).send({ error: 'No listid given.' });
    } else {
        if (req.user.lists === undefined || req.user.lists.length == 0) {
            return res.status(422).send({ error: 'No lists.'});
        }
        req.user.lists = JSON.parse(req.user.lists);
        var lstidx = -1;
        for(var i = 0; i < req.user.lists.length; i++) {
          if(req.user.lists[i]._id == req.body.listid) {      
              lstidx = i;
              break;
          }
        }
        if (lstidx == -1) {
            return res.status(422).send({ error: 'No list of that id.'});
        } else {
            req.user.lists.splice(lstidx, 1);
            req.user.lists = JSON.stringify(req.user.lists);
            req.user.save(function (err, user) {
                if (err) { return next(err); }
                //req.user.lists = JSON.parse(req.user.lists);
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
        var lstidx = -1;
        if (!req.body.listid || !req.body.taskid) {
            return res.status(422).send({ error: 'No listid or taskid given.' });
        } else {
            if (req.user.lists === undefined || req.user.lists.length == 0) {
                return res.status(422).send({ error: 'No lists.'});
            }
            req.user.lists = JSON.parse(req.user.lists);
            for(var i = 0; i < req.user.lists.length; i++) {
                if(req.user.lists[i]._id == req.body.listid) {        
                    lstidx = i;
                    break;
                }
            }
            if (lstidx == -1) {
                return res.status(422).send({ error: 'No list of that id.'});
            }
        }
        
        if (req.user.lists[lstidx].tasks === undefined || req.user.lists[lstidx].tasks.length == 0) {
            return res.status(422).send({ error: 'No tasks.'});
        }
        
        var taskidx = -1;
        for(var j = 0; j < req.user.lists[lstidx].tasks.length; j++) {
            if (req.user.lists[lstidx].tasks[j]._id == req.body.taskid) {        
                taskidx = j;
                break;
            }
        }
        if (taskidx == -1) {
            return res.status(422).send({ error: 'No task of that id.'});
        }
        let taskInfo = Task(req.user.lists[lstidx].tasks[taskidx]).toJson();
        return res.status(201).json({
            task: taskInfo
        });
    }
}

exports.createTask = function(req,res,next){
    const details = req.body.details;
    const name = req.body.name;//required
    const dueDate = req.body.dueDate;
    const listid = req.body.listid;//required

    if (!name) {
        return res.status(422).send({ error: 'No name for task given.' });
    }
    
    if (req.user.lists === undefined || req.user.lists.length == 0) {
        return res.status(422).send({ error: 'No lists.'});
    }
            
    req.user.lists = JSON.parse(req.user.lists);
    var lstidx = -1;
    for(var i = 0; i < req.user.lists.length; i++) {
        if(req.user.lists[i]._id == req.body.listid) {        
            lstidx = i;
            break;
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
    req.user.lists = JSON.stringify(req.user.lists);
    req.user.save(function (err, user) {
        if (err) { return next(err); }
        //req.user.lists = JSON.parse(req.user.lists);
        let userInfo = req.user.toJson();
        res.status(201).json({
            task : task, 
            user: userInfo
        });
    });
}

exports.updateTask = function (req, res, next) {
    const details = req.body.details;
    const name = req.body.name;
    const dueDate = req.body.dueDate;
    const listid = req.body.listid;//required
    
    var lstidx = -1;
    if (!req.body.listid || !req.body.taskid) {
        return res.status(422).send({ error: 'No listid or taskid given.' });
    } else {
        if (req.user.lists === undefined || req.user.lists.length == 0) {
            return res.status(422).send({ error: 'No lists.'});
        }
        req.user.lists = JSON.parse(req.user.lists);
        for(var i = 0; i < req.user.lists.length; i++) {
            if(req.user.lists[i]._id == req.body.listid) {        
                lstidx = i;
                break;
            }
        }
        if (lstidx == -1) {
            return res.status(422).send({ error: 'No list of that id.'});
        }
    }
    
    if (req.user.lists[lstidx].tasks === undefined || req.user.lists[lstidx].tasks.length == 0) {
        return res.status(422).send({ error: 'No tasks.'});
    }
    
    var taskidx = -1;
    for(var j = 0; j < req.user.lists[lstidx].tasks.length; j++) {
        if (req.user.lists[lstidx].tasks[j]._id == req.body.taskid) {        
            taskidx = j;
            break;
        }
    }
    if (taskidx == -1) {
        return res.status(422).send({ error: 'No task of that id.'});
    }
    
    let task = new Task({
        _id:     req.user.lists[lstidx].tasks[taskidx]._id, //maintains old id
        details: details != undefined ? details : req.user.lists[lstidx].tasks[taskidx].details,
        name:    name != undefined    ? name    : req.user.lists[lstidx].tasks[taskidx].name,
        dueDate: dueDate != undefined ? dueDate : req.user.lists[lstidx].tasks[taskidx].dueDate
    });
    
    req.user.lists[lstidx].tasks.splice(taskidx, 1);
    req.user.lists[lstidx].tasks.push(task);
    req.user.lists = JSON.stringify(req.user.lists);
    req.user.save(function (err, user) {
        if (err) { return next(err); }
        //req.user.lists = JSON.parse(req.user.lists);
        let userInfo = req.user.toJson();
        res.status(201).json({
            task: task, 
            user: userInfo
        });
    });
}

exports.deleteTask = function (req, res, next) {
  if (!req.body.listid || !req.body.taskid) {
        return res.status(422).send({ error: 'No listid or taskid given.' });
    } else {
        if (req.user.lists === undefined || req.user.lists.length == 0) {
            return res.status(422).send({ error: 'No lists.'});
        }
        req.user.lists = JSON.parse(req.user.lists);
        var lstidx = -1;
        for(var i = 0; i < req.user.lists.length; i++) {
          if (req.user.lists[i]._id == req.body.listid) {    
                lstidx = i;   
                break;
          }
        }
        if (lstidx == -1) {
            return res.status(422).send({ error: 'No list of that id.' });
        }
        
        if (req.user.lists[lstidx].tasks === undefined || req.user.lists[lstidx].tasks.length == 0) {
            return res.status(422).send({ error: 'No tasks.'});
        }
        
        var taskidx = -1;
        for(var j = 0; j < req.user.lists[lstidx].tasks.length; j++) {
            if (req.user.lists[lstidx].tasks[j]._id == req.body.taskid) {        
                taskidx = j;
                break;
            }
        }
        if (taskidx == -1) {
            return res.status(422).send({ error: 'No task of that id.' });
        }
        req.user.lists[lstidx].tasks.splice(taskidx, 1);
        req.user.lists = JSON.stringify(req.user.lists);
        req.user.save(function (err, user) {
            if (err) { return next(err); }
            //req.user.lists = JSON.parse(req.user.lists);
            let userInfo = user.toJson();
            res.status(201).json({
                deleted: true,
                user: userInfo
            });
        });
    }
}


