var cityInputEl = document.getElementById("search-input");
var button = document.getElementById("search");
var currentWeatherDiv = document.getElementById("current-cond");
var futureWeatherDiv = document.getElementById("future-cond");
var weatherList = document.getElementById("current-weather-info");
var weatherListCity = document.getElementById("current-weather-title");
var today = dayjs();

var APIKey = "6674215d50eef0df277d80b3c82dbc99";



function getCoordinates() {
    var inputVal = cityInputEl.value
    var cityState = inputVal.split(",")
    var city = cityState[0];
    var state = cityState[1];
    var country = "US";
    var coordinatesRequestURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + state + "," + country + "&appid=" + APIKey;

    fetch(coordinatesRequestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data[0].lat
            var lon = data[0].lon
            var currentWeatherQueryURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial";
            var futureWeatherQueryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial";
            fetch(currentWeatherQueryURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    var currentCity = data.name;
                    var temp = data.main.temp;
                    var wind = data.wind.speed;
                    var humidity = data.main.humidity
                    var weather = data.weather[0].description;
                    var li1 = document.createElement("li");
                    var li2 = document.createElement("li");
                    var li3 = document.createElement("li");
                    var li4 = document.createElement("li");
                    li1.setAttribute("class", "current-weather-items");
                    li2.setAttribute("class", "current-weather-items");
                    li3.setAttribute("class", "current-weather-items");
                    li4.setAttribute("class", "current-weather-items");
                    li1.textContent = "Current Condition: " + weather;
                    li2.textContent = "Temp: " + temp + " degrees F";
                    li3.textContent = "Wind: " + wind + " mph";
                    li4.textContent = "Humidity: " + humidity + " %";
                    weatherList.appendChild(li1);
                    weatherList.appendChild(li2);
                    weatherList.appendChild(li3);
                    weatherList.appendChild(li4);

                    if (weather === "scattered clouds") {
                        weatherListCity.textContent === currentCity + " " + today.format("MM,DD,YYYY") + " 🌥️";
                    } else if (weather === "clear sky") {
                        weatherListCity.textContent = currentCity + " " + today.format("MM,DD,YYYY") + " ☀️";
                    } else if (weather ==="few clouds") {
                        weatherListCity.textContent = currentCity + " " + today.format("MM,DD,YYYY") + " 🌤️";
                    } else if (weather === "broken clouds") {
                        weatherListCity.textContent = currentCity + " " + today.format("MM,DD,YYYY") + " 🌥️";
                    } else if (weather === "overcast clouds") {
                        weatherListCity.textContent = currentCity + " " + today.format("MM,DD,YYYY") + " ☁️";
                    } else if (weather === "light rain" || "moderate rain" || "heavy rain") {
                        weatherListCity.textContent = currentCity + " " + today.format("MM,DD,YYYY") + " 🌧️";
                    } else if (weather === "thunderstorm with light rain" || "thunderstorm with rain" || "thunderstorm with heavy rain" || "light thunderstorm" || "thunderstorm" || "heavy thunderstorm") {
                        weatherListCity.textContent = currentCity + " " + today.format("MM,DD,YYYY") + " ⛈️";
                    } else if (weather === "rain and snow" || "light rain and snow" || "shower snow" || "heavy shower snow" || "very light snow" || "light snow" || "snow") {
                        weatherListCity.textContent = currentCity + " " + today.format("MM,DD,YYYY") + " 🌨️";
                    } else {
                        weatherListCity.textContent = currentCity + " " + today.format("MM,DD,YYYY");
                    }
                })

            fetch(futureWeatherQueryURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                })
        })
}

button.addEventListener("click", getCoordinates);

