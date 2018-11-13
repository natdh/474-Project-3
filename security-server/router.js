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

    // /api/stuff/info -- GET -- needs authentication
    otherRoutes.get('/info',passportService.requireAuth,function(req,res,next){
        res.json({user: req.user.toJson()})});
    apiRoutes.use('/stuff',otherRoutes);
    app.use('/api', apiRoutes);
};