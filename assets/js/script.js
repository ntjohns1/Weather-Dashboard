/*
GIVEN a weather dashboard with form inputs
WHEN I search for a city
// OpenWeather Key = 3b41e908f8123a87745091fffda5bb2b
// get form element
// get search button click

THEN I am presented with current and future conditions for that city and that city is added to the search history
use the city search to apply the lat/lon element to the call
// append a div for the city
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// apply text content to the top weather data card
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// apply class with conditionals like we did in the last assignment
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
// use local storage to store the data pull function, we'll need to create an object with the info
*/
var userFormEl = document.querySelector('#user-form');
var searchInputEl = document.querySelector('#search-field');
var searchButton = document.querySelector('#submit');
var cityDate = document.querySelector('#city-date');
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


// calls geocoding API to use lat and lon in next function
// set up form element text guide that says enter city, state code, and country code
var getCitySearch = function () {

  var searchInput = searchInputEl.value.trim();

  var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchInput + '&limit=10&appid=3b41e908f8123a87745091fffda5bb2b';
  fetch(apiUrl)
    .then(function (response) {
      console.log(response);
      // figure out how to move .then in line 52 var lat & var lon are up one scope, we can continue it all in one function if we want
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      // for (var i = 0; i < data.length; i++) {
      // console.log(data[i].lat);
      // console.log(data[i].lon);
      // when dealing with multiple search results, append boostrap 'select' list to search field
      var lat = data[0].lat;
      var lon = data[0].lon;
      var weathURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=3b41e908f8123a87745091fffda5bb2b';
      console.log(weathURL);
      // }
      fetch(weathURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data)
          // now we can append the data to the page elements here
        });
    });
}

// Durham, NC, US

/* } else {
  alert('Error: ' + response.statusText);
}
})
.catch(function (error) {
alert('Unable to connect to Open Weather');
});
};
// Function to grab lat and lon variables (lines 58-59) from getCitySearch and plug it into our data search
// Question: I struggle with scope a bit, where do I need to put this function? I can call get city search in a function
// we are going to do the same thing with the next fetch = loop through response and grab the desired data[i].item
// Eventually we will have to deal with mutiple search results, it will involve looping through the city results and appending a selector to the formEl.
// parse data and print it to elements on page, Bob===Uncle.


/*var getFeaturedRepos = function (language) {
var apiUrl = 'https://api.github.com/search/repositories?q=' + language + '+is:featured&sort=help-wanted-issues';

fetch(apiUrl).then(function (response) {
if (response.ok) {
response.json().then(function (data) {
  displayRepos(data.items, language);
});
} else {
alert('Error: ' + response.statusText);
}
});
};

var displayRepos = function (repos, searchTerm) {
if (repos.length === 0) {
repoContainerEl.textContent = 'No repositories found.';
return;
}

repoSearchTerm.textContent = searchTerm;

for (var i = 0; i < repos.length; i++) {
var repoName = repos[i].owner.login + '/' + repos[i].name;

var repoEl = document.createElement('a');
repoEl.classList = 'list-item flex-row justify-space-between align-center';
repoEl.setAttribute('href', './single-repo.html?repo=' + repoName);

var titleEl = document.createElement('span');
titleEl.textContent = repoName;

repoEl.appendChild(titleEl);

var statusEl = document.createElement('span');
statusEl.classList = 'flex-row align-center';

if (repos[i].open_issues_count > 0) {
statusEl.innerHTML =
  "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
} else {
statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
}

repoEl.appendChild(statusEl);

repoContainerEl.appendChild(repoEl);
}
};*/




searchButton.addEventListener('click', getCitySearch);
