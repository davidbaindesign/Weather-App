$(document).ready(function() {
 
var celsius, fahrenheit, hiCelsius, lowCelsius, hiFahrenheit, lowFahrenheit;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var weatherMap = "http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=6180bd3f3dd535d87360adb5c9545cfd";

    $.getJSON(weatherMap, function(json) {

      var string = JSON.stringify(json);
      var obj = JSON.parse(string);

      // To convert from kelvin back to celsius, simply subtract 273.18 from °K

      //background of title, change colors and degrees to sunrise sunset, have div over it for cloud coverage.

      celsius = Math.round(obj.main.temp - 273.18);

      fahrenheit = Math.round(((celsius * 9) / 5) + 32);

      hiCelsius = Math.round(obj.main.temp_max - 273.18);

      hiFahrenheit = Math.round(((hiCelsius * 9) / 5) + 32);

      lowCelsius = Math.round(obj.main.temp_min - 273.18);

      lowFahrenheit = Math.round(((lowCelsius * 9) / 5) + 32);

      var d = new Date(0);
      d.setUTCSeconds(obj.sys.sunrise);
      var h = d.getHours();
      var m = d.getMinutes() / 100;
      var sunrise = h + m;

      var d2 = new Date(0);
      d2.setUTCSeconds(obj.sys.sunset);
      var h2 = d2.getHours();
      var m2 = d2.getMinutes() / 100;
      var sunset = h2 + m2;

      var d3 = new Date();

      var h3 = d3.getHours();
      var m3 = d3.getMinutes() / 100;
      var current = h3 + m3;

      $("#temp").html("<h1 style=font-size:280%;padding:10px>" + obj.name + ", " + obj.sys.country + "</h1><img style=display:block;margin:auto; src=" + "http://openweathermap.org/img/w/" + obj.weather[0].icon + ".png><p><i>" + obj.weather[0].description + "</i></p><div id=switch><div class=front><div class=nums><div id=numsLeft><h1>" + fahrenheit + "°</h1><p>" + hiFahrenheit + " | " + lowFahrenheit + "</p></div><div id=numsRight><h1>F</h1></div><p>Wind: " + Math.round(2.23694 * obj.wind.speed) + " mph</p></div></div><div class=back><div class=nums><div id=numsLeft><h1>" + celsius + "°</h1><p>" + hiCelsius + " | " + lowCelsius + "</p></div><div id=numsRight><h1>C</h1></div><p>Wind: " + Math.round(obj.wind.speed) + " ms</p></div></div></div><div class= nums><p>Direction: " + Math.round(obj.wind.deg) + "°</p><p style= line-height:.0>Humidity: " + obj.main.humidity + "%</p></div>");

      $("#switch").flip();

      if (Math.abs(current - sunset) <= 1) {

        //   -80 - 1.0
        //   -60 - .9
        //   -40 - .8
        //   -20 - .7
        //   0  - .6
        //   20 - .5
        //   40 - .4
        //   60 - .3
        //   80  - .2
        //   100 - .1
        //   120 -  0
        //   140 + .1
        //   160 + .2
        //   180 + .3
        //   200 + .4
        //   220 + .5
        //   240 + .6
        //   260 + .7
        //   280 + .8
        //   300 + .9
        //   320 + 1.0

        // - 20% sun top not visable
        // 120% sun not visable

        var x = current - sunset;
        var percent = 120 - (-20 * (x * 10));
        var color = "#7171C6";
        if (percent > 240) {
          color = "#0A0A49";
        };

        $("#title").css("background-image", "radial-gradient(circle at 50%" + percent.toString() + "% , #FFA500 30px, #EE4000 30px, " + color + " 50%)");

      } else if (Math.abs(current - sunrise) <= 1) {

        var x = sunrise - current;
        var percent = 120 - (-20 * (x * 10));
        var color = "#7171C6";
        if (percent > 240) {
          color = "#0A0A49";
        };

        $("#title").css("background-image", "radial-gradient(circle at 50%" + percent.toString() + "% , #FFA500 30px, #EE4000 30px, " + color + " 50%)");

      } else if (current > sunrise && current < sunset) { //day
        // maybe adjust % to cloud coverage, color for rain clouds, clear
        var percent = obj.clouds.all;
        var color = "#DDDDDD";

        $("#title").css("background-image", "radial-gradient(ellipse at 50% 250% , " + color + " " + percent + "%, #7171C6 120%)");

      } else {
        //night
        $("#title").css("background-image", "radial-gradient(ellipse at 50%" + "-70" + "% , #000099 30%, " + "#000000" + " 70%)");

      }

    });

  });

}

});