const express = require('express');
const routes = express.Router();
const userController = require('../controllers/userController');
const authenticator = require('../passportAuthenticator');

routes.get('/', (req, res) => {
	res.render('login');
});

routes.post('/', (req, res, next) => {
	userController.getUserByNameOrMail(req.body.username)
	.then( (user) => {
		if(user) {
			authenticator.auth(req, res, next, user);
		}
		else {
			console.log('no user login');
			res.render('login', {
				wrongData : 'Invalid username and password combination supplied.'
			});
		}
	})
});


module.exports = routes;


/*old passport authenticate de la libreria de note_modules ya lo sacamos para modificar el scope y hacelo 
trabajar con las variables 
const passport = require('../passportStrategy');
routes.post('/', passport.authenticate('local', {
	successRedirect : '/auth/',
	failureRedirect : '/'
}));*/