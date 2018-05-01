const express = require('express');
const routes = express.Router();
const userController = require('../controllers/userController');

routes.get('/', isLoggedIn, (req, res) => {
	console.log(req.session);
	res.render('profile', {
		user: req.session
	});	
});

routes.post('/', (req, res) => {
	req.session.destroy();
	res.redirect('/');
});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		next();
	} else {
		res.redirect('/login');
	}
};

module.exports = routes;