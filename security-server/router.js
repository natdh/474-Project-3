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
    otherRoutes.get('/task',passportService.requireAuth,TaskController.getTask);
    
    // /api/home/task -- POST -- needs authentication
    otherRoutes.post('/task',passportService.requireAuth,TaskController.createTask);
    
    // /api/home/task -- PUT -- needs authentication - maybe combine with post? idk
    otherRoutes.put('/task',passportService.requireAuth,TaskController.updateTask);
    
    // /api/home/task -- DELETE -- needs authentication
    otherRoutes.delete('/task',passportService.requireAuth,TaskController.deleteTask);
        
};