var express = require('express');
var router = express.Router();
var configjs = require('../config.js');
var mongoose = require('mongoose');
var Url = require('../models/Url.js');

/* GET admin page. */
router.get('/', function(req, res, next) {	
	Url.find(function (err, urls) {
		if (err){
			console.error(err);
			res.render("error.html");
		} else {
			Url.aggregate([
				{ 
					$group: {
						_id: null,
						nbVisited: { $sum: '$nbVisited'}
					}
				}
			], function (err, results) {
				if (err) {
					console.error(err);
					res.redirect('/');
				} else if(results == "") {
					res.render('admin.html', { title: 'Admin', port: configjs.port, nbUrl: 0, urls: [], nbVisited: 0});
				} else {
					urlVisited = results[0].nbVisited;
					res.render('admin.html', { title: 'Admin', port: configjs.port, nbUrl: urls.length, urls: urls, nbVisited: urlVisited});
				}
			});
		}
	});
});

module.exports = router;

