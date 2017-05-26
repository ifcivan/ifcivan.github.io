function getXHR() {
    var xhrobj;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xhrobj = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xhrobj = new ActiveXObject('Microsoft.XMLHTTP');
    }
    return xhrobj;
}

var APPID = "978505c286a16b4f4e85b22078187676";

var cityname;
var url;
var send = document.getElementById('send');

var selectedcity = document.getElementById('selectedcity');
var clouddescr = document.getElementById('clouddescr');
var cloudimg = document.getElementById('cloudimg');
var temp = document.getElementById('temp');
var pressure = document.getElementById('pressure');
var humidity = document.getElementById('humidity');
var windspeed = document.getElementById('windspeed');

send.addEventListener('click', function() {
	cityname = document.getElementById('cityname').value;
	if (cityname == "") {alert("Введіть назву міста"); return;};
	url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityname + '&APPID=' + APPID;
	var xhr = getXHR();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status != 200)
		{
			alert("На жаль, погоди для " + cityname + " на сайті немає");
			return;
		}	
    	if (xhr.readyState == 4 && xhr.status == 200) {
        	var data = JSON.parse(xhr.responseText);
			selectedcity.innerHTML = data.name;
        	clouddescr.innerHTML = data.weather[0].description;
        	cloudimg.setAttribute('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png'); 
        	temp.innerHTML = Math.round(data.main.temp - 273.15);
        	pressure.innerHTML = data.main.pressure;
        	humidity.innerHTML = data.main.humidity;
        	windspeed.innerHTML = data.wind.speed;
		} 
		
		
	}
	
	xhr.open('GET', url, true);
	xhr.send();
 
}, false);
