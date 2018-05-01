const postModel = require('../models/postModel');

exports.getPost = function() {
	return postModel.getPost();
};