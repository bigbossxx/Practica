const userModel = require("../models/userModel.js");

exports.crear = function() {
	userModel.crear();
};

exports.newUser = function(username, pwd, mail, birthdate) {
	return userModel.newUser(username, pwd, mail, birthdate);
};

exports.getUserByNameOrMail = (username, mail) => {
	return userModel.getUserByNameOrMail(username, mail);
};

exports.getUserById = (id) => {
	return userModel.getUserById(id);
};

exports.hash = (pwd) => {
	return userModel.hash(pwd);
};

exports.validPassword = (pwd, hashPassword) => {
	return userModel.validPassword(pwd, hashPassword);
};
