var mongoose = require('mongoose')

var clientSchema = new mongoose.Schmea({
	name: { type: String, unique: true, required: true },
	id: { type: String, unique: true, required: true},
	secret: { type: String, required: true },
  	userId: { type: String, required: true }
})

module.exports = mongoose.model('Client', ClientSchema);
})