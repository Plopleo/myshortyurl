var express = require('express');
var router = express.Router();
var configjs = require('../config.js');
var mongoose = require('mongoose');
var Url = require('../models/Url.js');
var shortId = require('shortid');
var validUrl = require('valid-url');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index.html', { title: 'Shorty', port: configjs.port });
});

router.post('/',function(req, res){
	if(!validUrl.isUri(req.body.longUrl)){
		res.send('badurl');
		return;
	}
	Url.findOne({'urlLong': req.body.longUrl}, function (err, url) {
		if (err) {
		 console.log(err.name);
		 return;
		}
		if (!url){
			var uniqueId = shortId.generate();
			var shortUrl = 'http://shortyurl.com/'+uniqueId;
			var newUrl = new Url({
				_id: uniqueId,
				urlLong: req.body.longUrl,
				urlShort: shortUrl,
				nbVisited: 0
			});
			newUrl.save();
			newUrl.addNewUrl();
			res.send(shortUrl);
		} else {
			// Si l'url existe déjà, retourne sa version courte qui existe déjà
			res.send(url.urlShort);
			return;
		}
	});	
});

router.post('/admin',function(req, res){	
	Url.findOne({ urlLong: req.body.urlClicked }, function (err, url){
		url.nbVisited = url.nbVisited+1;
		url.save();
		url.clickOnUrl();
	});
	
	res.send(req.body.urlClicked);	
});

module.exports = router;
