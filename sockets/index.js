var Url = require('../models/Url.js');
// sockets/index.js
module.exports = function (io) {
    io.on('connection', function (socket) {
        Url.listenToNewUrl(function (data) {
			socket.emit('newUrl');
		});
		Url.listenToUrlClicked(function (data) {
			socket.emit('urlClicked');
		});
        
    });
    
}
