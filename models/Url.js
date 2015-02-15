var mongoose = require('mongoose');
var shortId = require('shortid');
var EventEmitter = require('events').EventEmitter;
var dispatcher = new EventEmitter();

var UrlSchema = new mongoose.Schema({
	_id: {
		type: String,
		unique: true,
		'default': shortId.generate
	},
	urlLong: String,
	urlShort: String,
	nbVisited: Number
});

UrlSchema.methods.addNewUrl = function addNewUrl () {
		dispatcher.emit("newUrl");//passer arg ici, en 2nd parametre
};

UrlSchema.methods.clickOnUrl = function clickOnUrl () {
		dispatcher.emit("urlClicked");
};

UrlSchema.statics.listenToNewUrl = function (callback) {
	dispatcher.on('newUrl', callback);
};

UrlSchema.statics.listenToUrlClicked = function (callback) {
	dispatcher.on('urlClicked', callback);
};

module.exports = mongoose.model('Url', UrlSchema);
