const AuthenticationController = require('./controllers/authentication'),  
      express = require('express'),
      passportService = require('./security/passport');
     
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
<<<<<<< HEAD

    // /api/home/info -- GET -- needs authentication
    otherRoutes.get('/info',passportService.requireAuth,function(req,res,next){
        res.json({user: req.user.toJson()})});
    otherRoutes.get('/mylists');
    apiRoutes.use('/home',otherRoutes);
=======
    // /api/stuff/info -- GET -- needs authentication
    otherRoutes.get('/info',passportService.requireAuth,function(req,res,next){
        res.json({user: req.user.toJson()})});
        
    apiRoutes.use('/stuff',otherRoutes);
>>>>>>> 76e1d02f05e883734fe0018f9c4583fece3bfac1
    app.use('/api', apiRoutes);
};