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

