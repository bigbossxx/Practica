const express = require('express');
const routes = express.Router();
const userController = require('../controllers/userController');
const authenticator = require('../passportAuthenticator');

routes.get('/', (req, res) => {
	res.render('userReg');
});

routes.post('/', (req, res, next) => {		
	userController.getUserByNameOrMail(req.body.username, req.body.mail)
	.then( (user) => {
		if(!user) {
			if(req.body.pwd === req.body.repwd) {
				userController.hash(req.body.pwd)
				.then( (hashPassword) => {
					if(hashPassword) {
						userController.newUser(req.body.username, hashPassword, req.body.mail, req.body.birthdate)
						.then( (result) => {
							userController.getUserById(result.insertId)
							.then ( (userForPassport) => {
								if(userForPassport) {
									authenticator.auth(req, res, next, user);
								} else {
									console.log('Error en  routes userReg');
								}
							})
						});				
					} else {
						console.log('Error con script del hash en routes userReg');
					}
				});			
			} else {
				res.render('userReg',{wrongpwd : 'pass no coincide'});
			}
		} else {
			console.log(user);
			res.render('userReg',{user : 'the username or email is already registered'}); 
		}
	});
});

/*routes.post('/', passport.authenticate('local-signup', {
	successRedirect : '/auth/',
	failureRedirect : '/'
}));*/

module.exports = routes;	

/* la consulta entrega un array de datos, al enviar la posicion como respuest desde el modelo result[0] 
en el momemto en que se pregunta por el user if(user) si no hay data en la posicion result[0] envia un undefined
si no envio la posicion nos va a entrar un array vacio [] como user por ende cambia la condicion del if 
if(user.length)*/