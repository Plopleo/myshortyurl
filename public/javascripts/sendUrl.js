function load() { 
	var button = document.getElementById("submit"); 
	button.addEventListener("click", sendUrl, false);
	
	var shortLinks = document.getElementsByClassName("urlShort");
	for (var i = 0; i < shortLinks.length; i++) {
		shortLinks[i].addEventListener("click", incrementNbVisited, false);
	}
	
} 

function sendUrl() {
	var inputValue = document.getElementById('longUrl').value;
	var longUrl = inputValue.trim();
	//alert('yo');
	if(longUrl != "") {
		var xmlhttp = null;
		if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp = new XMLHttpRequest();
		} else { // code for IE6, IE5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}			
		var url = "/";
		var params = "longUrl=" + encodeURIComponent(longUrl);
		xmlhttp.open("POST", url, true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4) { // données complètes reçues du serveur
				if(xmlhttp.responseText!='badurl'){
					var currentUrl = document.URL;
					var urlEnd = currentUrl.substring(currentUrl.lastIndexOf("/") + 1, currentUrl.length);
					if(urlEnd != 'admin'){
						var link = '<a href="'+longUrl+'" class="fade" id="linkUrlShort" target="blank">'+xmlhttp.responseText+'</a>'
						document.getElementById('urlShort').innerHTML = link;
					} else {
						var row = 	'<div class="row content fade">\
										<div class="cell">'+longUrl+'</div>\
										<div class="cell"><a href="'+longUrl+'" target="blank" class="urlShort" >'+xmlhttp.responseText+'</a></div>\
									</div>';
						document.getElementById('table').innerHTML += row;
					}
				}else{
					alert('Url format should be like this: http(s)://(www.)website.com');
				} 
			}
		}
		xmlhttp.send(params);
		document.getElementById('longUrl').value = "";
	}
}

function incrementNbVisited(evt) {
	var currentUrl = document.URL;
	var urlEnd = currentUrl.substring(currentUrl.lastIndexOf("/") + 1, currentUrl.length);
	if(urlEnd != 'admin'){
		var urlClicked = document.getElementById('linkUrlShort').href;
	} else {
		var urlClicked = evt.currentTarget;
	}
	var xmlhttp = null;
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	}
	else {// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	var url = "/admin";
	var params = "urlClicked=" + encodeURIComponent(urlClicked);
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(params);	
}
