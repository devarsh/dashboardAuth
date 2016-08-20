var passport = require('passport')
var BasicStrategy = require('passport-http').BasicStrategy
var User = require('../models/user')


passport.use(new BasicStrategy(
	function (username,password,cb) {
		User.findOne({username : username},function(err,user) {
			if(err) return cb(err);
			if(!user) return cb(null,false);
			user.verifyPassword(password,function(err1,isMatch) {
				if(err1) {
					return cb(err);
				}
				if(!isMatch) {
					return cb(null,false)
				}
				return cb(null,user)
			})
		})
	}
))

exports.isAuthenticated = passport.authenticate('basic', { session : false })


