exports.editTask = function (req, res, next) {
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
exports.deleteTask = function (req, res, next) {
    const task = req.body.task;

    return res.status(200).json({
        task: null
    })
}