// Load required packages
var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

var userSchema = new mongoose.Schema({
	username : { type: String, required: true, index: true, unique: true },
	password : { type: String, required: true}
})

//done use arrow function `this` scope is messed up 
userSchema.pre('save',function(cb) {
	var user = this
	bcrypt.genSalt(5, function(err,salt) {
		if(err) return cb(err)
		bcrypt.hash(user.password,salt,null,function (err,hash) {
			if(err) return cb(err)
			user.password = hash
			cb()
		})
	})
})

userSchema.methods.verifyPassword = function (password,cb) {
	bcrypt.compare(password,this.password,function(err,isMatch) {
		if(err) return cb(err)
		cb(null,isMatch)
	})
}


module.exports = mongoose.model('Users',userSchema)