var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

app = express();
exports.passport = passport;
exports.LocalStrategy = LocalStrategy;

app.use(express.static(__dirname + '/public'));
app.use(express.cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.session({secret: 'SECRET'}));
app.use(passport.initialize());
app.use(passport.session());
app.listen(8080);
