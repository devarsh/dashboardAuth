var express = require('express')
var mongoose = require('mongoose')
var bodyPasers = require('body-parser')
var passport = require('passport')
var port = process.env.PORT || 3000
var beerController = require('./beerlocker/controller/beer.js')
var userController = require('./beerlocker/controller/user.js')
var authController = require('./beerlocker/controller/auth.js')

mongoose.connect('mongodb://localhost:27017/beerlocker');

var app = express()
app.use(bodyPasers.urlencoded({
	extended:true
}))
app.use(passport.initialize())

var router = express.Router()
router.get('/',(req,res)=> {
	res.json({message : `You're running on a dangrelously low beer server`})
})

//will be mounted on /api/beers
var beersRoute = router.route('/beers')
	.post(authController.isAuthenticated,beerController.postBeer)
	.get(authController.isAuthenticated,beerController.getBeers)
var beerRoute = router.route('/beers/:beer_id')
	.get(authController.isAuthenticated,beerController.getBeer)
	.put(authController.isAuthenticated,beerController.putBeer)
	.delete(authController.isAuthenticated,beerController.deleteBeer)



var usersRoute = router.route('/users')
	.post(userController.postUser)
	.get(authController.isAuthenticated,userController.getUsers)


app.use('/api',router);

app.listen(port)
console.log(`Insert beer on port : ${port}`)