var Users = require('../models/user.js')


exports.postUser = function (req,res) {
	var user = new Users({
		username : req.body.username,
		password : req.body.password
	})
	user.save(function(err) {
		if(err) return res.send(err)
		user.on('index',function(err) { 
			console.log(err)
		})
		res.json({message:`New beer dinker ${req.body.username} added to the locker`})
	})
}

exports.getUsers = (req,res) => {
	Users.find(function(err, users) {
    if (err) return res.send(err)
    res.json(users)
  })
}