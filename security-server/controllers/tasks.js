exports.editTask = function (req, res, next) {
    const name = req.body.name;
    const dueDate = req.body.dueDate;
    const details = req.body.details;

    //not sure what to actually return
    return res.status(200).json({
        validated: true
    })
}