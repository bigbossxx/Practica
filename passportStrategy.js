const passport = require('passport');
const passportHelpers = require ('./passportHelpers.js');
const localStrategy = require ('passport-local').Strategy;
const userController = require ('./controllers/userController');

passportHelpers();

passport.use('local', new localStrategy({
		passwordField : 'pwd',
		passReqToCallback : true	
	}, (req, username, pwd, done) => {
		userController.getUserByNameOrMail(username)
		.then( (user) => {
			if (!user) {
				done(user); // ERROR la promesa solo devuelve 1 valor por lo tando done(err) da como resultado err no defined
			} else {
				userController.validPassword(pwd, user.pwd)
				.then( (result) => {
					if(result) {
						done(null, user);
					} else {
						done(null, result);
					}
					/*if(result) {  
						req.logIn(user, (err) => {
							if (err) {
								console.log(err, 'error en script estrategia');			solo chekear no logear desde la estrategia
							} else {
								req.session.id = user.id;
								done(null, user);
							}
						});
					} else {
						done(result); // ERROR la promesa solo devuelve 1 valor por lo tando done(err) da como resultado err no defined
					}*/
				}); // -------------.cacth(err)
			}
		});
}));

module.exports = passport;


/*old local-sign up ---no se debe logear desde la estrategia por eso se creo el passportAuthenticate
passport solo debe chekear el usuario y el passportAuthenticate logearlo 
passport.use('local-signup', new localStrategy ({
	passwordField : 'pwd',
	passReqToCallback : true
	}, (req, username, pwd, done) => {
		userController.getUserByNameOrMail(username)
		.then((resullt) => {
			if(resullt) {
				console.log('Ya existe el usuario');
				console.log(resullt);
				done(resullt);
			} else {
				if(pwd === req.body.repwd) {
					userController.hash(pwd)
					.then( (hashPassword) => {
						if(hashPassword) {
							userController.newUser(username, hashPassword, req.body.mail, req.body.birthdate)
							.then( (result) => {
								if(result) {
									userController.getUserById(result.insertId)
									.then( (user) => {
										console.log(user);
										console.log(user.id);
										if(user) {
											req.logIn(user, (err) => {
												if(err) {
													console.log(err , 'Error en req.logIn local-signup');
												} else {
													req.session.id = user.id;
													done(null, user);
												}
											});	
										} else {
											console.log('Error');											
										}
									});
								} else {
									console.log('Error al crear usuarios');
								}
							});
						} else {
							console.log('Error de hash en local-signup strategy');
						}
					});
				} else {
					console.log('pwd no coincide')
				}
			}
		});
}));*/