const postController = require ('../controllers/postController');
const connection = require('../db.js');

exports.getPost = function() {
	return new Promise(function(resolve, reject) {
		connection.query('SELECT * FROM post', function(err, result) {
			if(err) {
				reject(new Error(err));
			} else {
				resolve(result);
			}
		});
	});
};