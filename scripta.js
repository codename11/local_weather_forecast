var xt = "https://fcc-weather-api.glitch.me/api/current?";
var xr = document.getElementById("gmap");
var error = "";
var tnt = "";
var br = 0;
$(document).ready(function() {
  function geo_error() {
    alert("Sorry, no position available.");
  }
  
  var geo_options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, geo_error); //navigator.geolocation.watchPosition(showPosition, geo_error, geo_options);
  } else {
    xt = "Geolocation is not supported by this browser.";
  }

  function showPosition(position) {
	  
    xt +=
      "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;

    var latlon = position.coords.latitude + "," + position.coords.longitude;
	const kljuc = "AIzaSyBNhe45otXCcDn2ZV1dqla-IyYTyLm1HDU".split("");
    var img_url =
      "https://maps.googleapis.com/maps/api/staticmap?center=" +
      latlon +
      "&zoom=14&size=400x300&key="+kljuc.join("");

    document.getElementById("gmap").innerHTML = "<img src='" + img_url + "'>";
	
    $.getJSON(xt, function(json) {
      //$("#message").html(JSON.stringify(json));
      tnt = JSON.stringify(json);
	  
      $("#name").prepend(json.name + ", " + json.sys.country);

      if (br === 0) {
        $("#temp").text(json.main.temp + "°C");
      }

      $("#temp").on("click", function() {
        var fahr = json.main.temp * (9 / 5) + 32;
        br++;
        if (br > 1) {
          br = 0;
          $("#temp").text(json.main.temp + "°C");
        }

        if (br == 1) {
          $("#temp").text(fahr.toFixed(2) + "°F");
        }
      });

      $("#weather").prepend(json.weather[0].main);
      var scr = json.weather[0].icon;
      $("img#icon").attr("src", scr);
    });
  }

  $(".animated").mouseenter(function() {
    $(this).addClass("rubberBand");
  });

  $(".animated").mouseleave(function() {
    $(this).removeClass("rubberBand");
  });
});
