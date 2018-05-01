//modificacion de passport.authenticate para tener mas control con el scope

const passport = require('./passportStrategy');

const authenticator = {

	auth(req, res, next) {

		passport.authenticate('local', (err, user) => {
			if(err) {
				console.log(err, 'authenticator');
			}
			if (user) {
				req.logIn(user, (err) => {
					if (err) {
						console.log(err);
					} else {
					req.session.id = user.id; //change to key ?? --redis--
					res.redirect('/auth/');
					}
				})
			} else {
				res.render('login', {
					wrongData : 'Invalid username and password combination supplied.'
				});
				console.log('no user, authenticator');
			}
		})(req, res, next);
	}
};

module.exports = authenticator;