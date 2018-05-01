const passport = require ('passport');
const userController = require('./controllers/userController');

module.exports = () => {
	passport.serializeUser( (user, done) => {
	  done(null, user.id);
	});

	passport.deserializeUser( (id, done) => {
	  userController.getUserById(id)
	  .then( (user) => {
	    done(null, user);
	  });
	});	
};
