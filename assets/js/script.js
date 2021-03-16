
// xGIVEN a weather dashboard with form inputs WHEN I search for a city
// OpenWeather Key = 3b41e908f8123a87745091fffda5bb2b
var userFormEl = document.querySelector('#user-form');
var searchInputEl = document.querySelector('#search-field');
var searchButton = document.querySelector('#submit');
var cityDate = document.querySelector('#city-name');
var date = document.getElementById('date');
var icon = document.querySelector('#icon');
var temp = document.querySelector('#temp');
var humidity = document.querySelector('#humidity');
var windSpeed = document.querySelector('#wind-speed');
var uvIndex = document.querySelector('#uv-index');
var day1 = document.querySelector('#day1');
var day2 = document.querySelector('#day2');
var day3 = document.querySelector('#day3');
var day4 = document.querySelector('#day4');
var day5 = document.querySelector('#day5');

// function to clear out form see review activity solution

// THEN I am presented with current and future conditions for that city and that city is added to the search history use the city search to apply the lat/lon element to the call
// calls geocoding API to use lat and lon in next function
// set up form element text guide that says enter city, state code, and country code
var getCitySearch = function () {

  var searchInput = searchInputEl.value.trim();

  var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchInput + '&limit=10&appid=3b41e908f8123a87745091fffda5bb2b';
  fetch(apiUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var cityDate = document.querySelector('#city-name');
      var currentName = data[0].name;
      var currentState = data[0].state;
      var country = data[0].country;
      cityDate.textContent = currentName + ', ' + currentState + ', ' + country;
      // when dealing with multiple search results, append boostrap 'select' list to search field
      // for (var i = 0; i < data.length; i++) {
      // console.log(data[i].lat);
      // console.log(data[i].lon);
      var lat = data[0].lat;
      var lon = data[0].lon;
      var weathURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=3b41e908f8123a87745091fffda5bb2b';
      console.log(weathURL);
      // }
      fetch(weathURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);

          /*WHEN I view current weather conditions for that city
          THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index*/
          var timeStamp = data.current.dt;
          console.log(data.current.dt);
          var today = moment.unix(timeStamp).format("dddd, MMMM Do YYYY");
          console.log(today);
          var iconCode = data.current.weather[0].icon;
          icon.src = "http://openweathermap.org/img/wn/" + iconCode + ".png";
          temp.textContent = 'Temperature: ' + data.current.temp + ' degrees F';
          humidity.textContent = 'Humidity: ' + data.current.humidity + '%';
          windSpeed.textContent = 'Windspeed: ' + data.current.wind_speed + ' mph';
          uvIndex.textContent = 'UV Index: ' + data.current.uvi;
          date.textContent = ' - ' + today;

          var tempEls = document.querySelectorAll('.temp');
          console.log(tempEls);
          for (let i = 0; i < tempEls.length; i++) {
            const tempEl = tempEls[i];
            tempEl.innerText = 'whatever'
          }

          // WHEN I view the UV index, THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe.
          // apply class with conditionals like we did in the last assignment
          // WHEN I view future weather conditions for that city THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
        });
    });
};
// WHEN I click on a city in the search history THEN I am again presented with current and future conditions for that city
// use local storage to store the data pull function, we'll need to create an object with the info

// Durham, NC, US
/*
} else {
  alert('Error: ' + response.statusText);
}
})
.catch(function (error) {
alert('Unable to connect to Open Weather');
});
};
*/




searchButton.addEventListener('click', getCitySearch);
