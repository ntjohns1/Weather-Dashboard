
// xGIVEN a weather dashboard with form inputs WHEN I search for a city
// OpenWeather Key = 3b41e908f8123a87745091fffda5bb2b
var userFormEl = document.querySelector('#user-form');
var searchInputEl = document.querySelector('#search-field');
var searchButton = document.querySelector('#submit');
var cityName = document.querySelector('#city-name');
var date = document.getElementById('date');
var icon = document.querySelector('#icon');
var temp = document.querySelector('#temp');
var humidity = document.querySelector('#humidity');
var windSpeed = document.querySelector('#wind-speed');
var uvIndex = document.querySelector('#uv-index');
var buttonDiv = document.querySelector('#search-history');
var buttonEl = document.querySelectorAll(".buttons")
var buttonArray = new Array();
console.log(buttonArray)


// function to clear out form see review activity solution

// THEN I am presented with current and future conditions for that city and that city is added to the search history 
// use the city search to apply the lat/lon element to the call
// calls geocoding API to use lat and lon in next function
// set up form element text guide that says enter city, state code, and country code
function getSaves() {
  var searchSaves = JSON.parse(localStorage.getItem("savedSearch"));
  if (searchSaves !== null) {
    for (let i = 0; i < searchSaves.length; i++) {
      buttonArray.push(searchSaves[i])
    }
  } else {
    return;
  }
}

var getCitySearch = function () {
  var searchInput = searchInputEl.value.trim();
  console.log(searchInput);
  var apiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchInput + '&limit=10&appid=3b41e908f8123a87745091fffda5bb2b';
  fetch(apiUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var currentName = data[0].name;
      var currentState = data[0].state;
      var country = data[0].country;
      var nameData = currentName + ', ' + currentState + ', ' + country;
      cityName.textContent = nameData;
      // when dealing with multiple search results, append boostrap 'select' list to search field
      // for (var i = 0; i < data.length; i++) {
      // console.log(data[i].lat);
      // console.log(data[i].lon);
      // }
      var buttonEl = document.createElement('button');
      buttonEl.setAttribute('class', 'list-group-item list-group-item-action');
      buttonEl.classList.add('buttons');
      buttonEl.setAttribute('type', 'button');
      var buttonTxt = document.createTextNode(nameData);
      // var textGrab = buttonDiv.children.innerHTML
      buttonEl.appendChild(buttonTxt);
      buttonDiv.prepend(buttonEl);
      buttonArray.push(buttonTxt);
      var lat = data[0].lat;
      var lon = data[0].lon;
      var weathURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=3b41e908f8123a87745091fffda5bb2b';
      console.log(weathURL);

      fetch(weathURL)
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            alert('Error: ' + response.statusText);
          }

        })
        .catch(function (error) {
          alert('Unable to connect to Open Weather');
        })
        .then(function (data) {
          document.getElementById('current-display').removeAttribute('hidden');
          document.getElementById('forecast-table').removeAttribute('hidden');
          
          console.log(data);

          /*WHEN I view current weather conditions for that city
          THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index*/
          var timeStamp = data.current.dt;
          console.log(data.current.dt);
          var today = moment.unix(timeStamp).format("dddd, MMMM Do YYYY");
          console.log(today);
          var iconCode = data.current.weather[0].icon;
          date.textContent = ' - ' + today;
          icon.src = "http://openweathermap.org/img/wn/" + iconCode + ".png";
          temp.textContent = 'Temperature: ' + data.current.temp + ' °F';
          humidity.textContent = 'Humidity: ' + data.current.humidity + '%';
          windSpeed.textContent = 'Windspeed: ' + data.current.wind_speed + ' mph';
          uvIndex.textContent = 'UV Index: ' + data.current.uvi;
          // WHEN I view the UV index, THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe.
          // apply class with conditionals like we did in the last assignment
          var currentUVI = data.current.uvi;
          console.log(typeof currentUVI);
          if (currentUVI <= 2) {
            uvIndex.classList.add('UV-lo')
          } else if (currentUVI <= 4) {
            uvIndex.classList.add('UV-med-lo')
          } else if (currentUVI <= 6) {
            uvIndex.classList.add('UV-med')
          } else if (currentUVI <= 8) {
            uvIndex.classList.add('UV-med-hi')
          } else {
            uvIndex.classList.add('UV-hi')
          };

          // WHEN I view future weather conditions for that city THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
          // looping through table elements with 5-day forecast data.
          // loop for date in <thead>
          var dailyForecastDate = document.querySelectorAll('.forecast-date');
          console.log(dailyForecastDate);
          for (let i = 0; i < dailyForecastDate.length; i++) {
            const dailyDateEl = dailyForecastDate[i];
            const tHeadDate = data.daily[i].dt;
            var tHead = moment.unix(tHeadDate).format("ddd, M/D");
            dailyDateEl.innerText = tHead;
          }

          // loop for icon
          var dailyForecastIcon = document.querySelectorAll('.forecast-icon');
          console.log(dailyForecastIcon);
          for (let i = 0; i < dailyForecastIcon.length; i++) {
            const dailyIconEl = dailyForecastIcon[i];
            const dailyIconCode = data.daily[i].weather[0].icon;
            dailyIconEl.src = "http://openweathermap.org/img/wn/" + dailyIconCode + ".png";
          }

          // loop for low temp
          var lowTempEls = document.querySelectorAll('.lo-temp');
          console.log(lowTempEls);
          for (let i = 0; i < lowTempEls.length; i++) {
            const lowTempTxt = lowTempEls[i];
            lowTempTxt.innerText = 'low: ' + Math.round(data.daily[i].temp.min) + ' °F';
          }
          // loop for high temp
          var highTempEls = document.querySelectorAll('.hi-temp');
          console.log(highTempEls);
          for (let i = 0; i < highTempEls.length; i++) {
            const highTempTxt = highTempEls[i];
            highTempTxt.innerText = 'high: ' + Math.round(data.daily[i].temp.max) + '°F';
          }
          // loop for humidity 
          var dailyHumidityEls = document.querySelectorAll('.humidity');
          console.log(dailyHumidityEls);
          for (let i = 0; i < dailyHumidityEls.length; i++) {
            const humidityTxt = dailyHumidityEls[i];
            humidityTxt.innerText = 'humidity: ' + data.daily[i].humidity + '%';
          }
          console.log(buttonArray)  
        });
      console.log(buttonArray)
    });
    console.log(buttonArray)
};
console.log(buttonArray)


function setSaves() {
  var buttonVal = buttonDiv.children.innerHTML;
  for (let i = 0; i < buttonEl.length; i++) {
    const element = buttonEl[i];
    buttonArray.push(buttonVal[i]);
  }
  console.log(buttonVal);
  localStorage.setItem('savedSearch', JSON.stringify(buttonArray));
}

// event delegation for event listener
buttonDiv.addEventListener("click", function (e) {
  for (let i = 0; i < buttonEl.length; i++) {
    const saveButton = buttonEl[i];
    console.log(e.target.innerHTML)
    console.log(saveButton.textContent)
  };
});



// this is where we use e.target
// plug the value of the button back into the city search function
// then deal with local storage







searchButton.addEventListener('click', function (event) {
  event.preventDefault();
  getCitySearch();
  getSaves();
  setSaves();
});



