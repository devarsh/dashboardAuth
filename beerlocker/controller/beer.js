var Beer = require('../models/beer.js')

exports.postBeer = (req,res) => {
	var beer = new Beer({
	name : req.body.name,
	type : req.body.type,
	quantity : req.body.quantity,
	userId : req.user._id
	})
	beer.save((err)=> {
		if(err) return res.send(err)
		res.json({message : 'Beer added to the locket', data:beer})
	})
}

exports.getBeers = (req,res) => {
	Beer.find( { userId: req.user._id },(err,beers) => {
		if(err) return res.send(err)
		res.json(beers)
	})
}

exports.getBeer = (req,res) => {
	Beer.find({ userId: req.user._id, _id: req.params.beer_id }, (err, beer) => {
    	if (err) return res.send(err)
    	res.json(beer)
  	})
}

exports.putBeer = (req,res) => {
	Beer.update({userId: req.user._id, _id: req.params.beer_id},{quantity : req.body.quantity}, (err,num,raw) => {
		if(err) return res.send(err)
		res.json({message : num })		
	})	
}

exports.deleteBeer = (req,res) => {
	Beer.remove({userId: req.user._id, _id: req.params.beer_id}, (err,beer) => {
		if(err) return res.send(err)	
		res.json({message : 'Beer removed from the locker!'})
	})
}

