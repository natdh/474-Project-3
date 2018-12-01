const AuthenticationController = require('./controllers/authentication'),  
      express = require('express'),
      passportService = require('./security/passport');

const TaskController = require('./controllers/tasks');
           
module.exports = function(app) {  
    // Initializing route groups
    const apiRoutes = express.Router(),
        authRoutes = express.Router(),
        otherRoutes = express.Router();

    apiRoutes.use('/auth', authRoutes);
    apiRoutes.use('/home',otherRoutes);
    app.use('/api', apiRoutes);
    
    // /api/auth/register -- POST
    authRoutes.post('/register', AuthenticationController.register);
    // /api/auth/login -- POST
    authRoutes.post('/login', AuthenticationController.login);
    // /api/auth/authorize -- GET -- needs authentication
    authRoutes.get('/authorize', passportService.requireAuth, AuthenticationController.authorize);
    
    // /api/home/info -- GET -- needs authentication
    otherRoutes.get('/info',passportService.requireAuth,function(req,res,next){
        res.json({user: req.user.toJson()})});
        
    // /api/home/list -- GET -- needs authentication
    otherRoutes.get('/list',passportService.requireAuth,TaskController.getList);
    
    // /api/home/list -- POST -- needs authentication
    otherRoutes.post('/list',passportService.requireAuth,TaskController.createList);
    
    // /api/home/list -- PUT -- needs authentication - maybe combine with post? idk
    otherRoutes.put('/list',passportService.requireAuth,TaskController.updateList);
    
    // /api/home/list -- DELETE -- needs authentication
    otherRoutes.delete('/list',passportService.requireAuth,TaskController.deleteList);
    
    // /api/home/task -- GET -- needs authentication
    otherRoutes.get('/task',passportService.requireAuth,function(req,res,next){
        if (!req.body.listid || !req.body.taskid) {
            return res.status(422).send({ error: 'No listid or taskid given.' });
        } else if (!req.user.lists[req.body.listid]) {
            return res.status(422).send({ error: 'No list of that id.' });
        } else if (!req.user.lists[req.body.listid].tasks[req.body.taskid]) {
            return res.status(422).send({ error: 'No task of that id.' });
        } else {
            res.json({list: req.user.lists[req.body.listid].tasks[req.body.taskid].toJson()});
        }
        
    });
        
};