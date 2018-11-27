const AuthenticationController = require('./controllers/authentication'),  
      express = require('express'),
      passportService = require('./security/passport');

const TaskController = require('./controllers/tasks'),  
      express = require('express');
           
module.exports = function(app) {  
    // Initializing route groups
    const apiRoutes = express.Router(),
            authRoutes = express.Router(),
            otherRoutes = express.Router();

    apiRoutes.use('/auth', authRoutes);
    
    // /api/auth/register -- POST
    authRoutes.post('/register', AuthenticationController.register);
    // /api/auth/login -- POST
    authRoutes.post('/login', AuthenticationController.login);
    // /api/auth/authorize -- GET -- needs authentication
    authRoutes.get('/authorize',passportService.requireAuth,AuthenticationController.authorize);

    // /api/home/info -- GET -- needs authentication
    otherRoutes.get('/info',passportService.requireAuth,function(req,res,next){
        res.json({user: req.user.toJson()})});
    // /api/home/mylists -- GET -- needs authentication
    //otherRoutes.get('/mylists', passportService.requireAuth, FUNCTIONCALLHERE); //TODO
    apiRoutes.use('/home',otherRoutes);

    app.use('/api', apiRoutes);
};