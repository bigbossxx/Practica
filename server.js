const express = require('express');
const app = express();
const handlebars = require('express-handlebars').create({defaultLayout: "main"});
const db = require ('./db.js');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const redis = require('redis').createClient();
const homeRoutes = require ('./routes/home.js');
const loginRoutes = require('./routes/login.js');
const userReg = require('./routes/userReg');
const auth = require('./routes/auth.js');

db.connect();

app.use(session({
	store : new redisStore({
		host : '127.0.0.1',
		port : 6379,
		client : redis,
		_expires : 1000
	}),
	secret : 'keyboard cat',
	resave : false,
	saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

//Defining middleware to serve static files
app.use('/static', express.static('public'));

app.use(bodyParser.urlencoded({ extended : true }));

app.set('port', process.env.PORT || 3000);

app.use('/', homeRoutes);
app.use('/login', loginRoutes);
app.use('/userReg', userReg);
app.use('/auth', auth);

app.listen('3000', () => {
	console.log('server up');
});				