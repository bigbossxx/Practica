const express = require("express");
const routes = express.Router();
const userController = require("../controllers/userController.js");
const postController =  require('../controllers/postController');

routes.get("/", (req, res) => {
	postController.getPost()
	.then( (result) => {
		res.render('home',{
			postData : result
		});
	});
});

routes.post("/", (req, res) => {
	userController.hash(req.body.pwd)
	.then( (result) => {
		if(result) {
			userController.newData(req.body.name, result)
			.then( (result) => {
				if(result) {
					res.send('thank you');
				}
			})
		} 
	});
});

/*routes.post('/login', (req, res) => {
	userController.getUser(req.body.name)
	.then( (result) => {
		if(result.length > 0) {
			console.log(result);
			console.log(result[0].pwd);
			userController.validPassword(req.body.pwd, result[0].pwd)
			.then( (result) => {
				if(result) {
					res.render('login');
				} else {
					console.log('get Out');
				}
			});
		} else {
			console.log('No user found');
		}
	});
});
*/
module.exports = routes;