var cityInputEl = document.getElementById("search-input");
var button = document.getElementById("search");
var searchHistoryDiv = document.getElementById("search-history");
var currentWeatherDiv = document.getElementById("current-cond");
var futureWeatherDiv = document.getElementById("future-cond");
var weatherList = document.getElementById("current-weather-info");
var weatherListCity = document.getElementById("current-weather-title");
var today = dayjs();
var searchHistory = [];
var APIKey = "6674215d50eef0df277d80b3c82dbc99";

function getWeather(prevCity) {
    var inputVal = cityInputEl.value;
    var city = prevCity || inputVal;
    var country = "US";
    var coordinatesRequestURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + country + "&appid=" + APIKey;
    storeSearchHistory();
    fetch(coordinatesRequestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data[0].lat;
            var lon = data[0].lon;
            var currentWeatherQueryURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial";
            fetch(currentWeatherQueryURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    weatherList.innerHTML = "";
                    var currentCity = data.name;
                    var temp = data.main.temp;
                    var wind = data.wind.speed;
                    var humidity = data.main.humidity;
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
                        weatherListCity.textContent =
                            currentCity + " " + today.format("MM.DD.YYYY") + " 🌥️";
                    } else if (weather === "clear sky") {
                        weatherListCity.textContent =
                            currentCity + " " + today.format("MM.DD.YYYY") + " ☀️";
                    } else if (weather === "few clouds") {
                        weatherListCity.textContent =
                            currentCity + " " + today.format("MM.DD.YYYY") + " 🌤️";
                    } else if (weather === "broken clouds") {
                        weatherListCity.textContent =
                            currentCity + " " + today.format("MM.DD.YYYY") + " 🌥️";
                    } else if (weather === "overcast clouds") {
                        weatherListCity.textContent =
                            currentCity + " " + today.format("MM.DD.YYYY") + " ☁️";
                    } else if (
                        weather === "light rain" || "moderate rain" || "heavy rain"
                    ) {
                        weatherListCity.textContent =
                            currentCity + " " + today.format("MM.DD.YYYY") + " 🌧️";
                    } else if (
                        weather === "thunderstorm with light rain" || "thunderstorm with rain" || "thunderstorm with heavy rain" || "light thunderstorm" || "thunderstorm" || "heavy thunderstorm"
                    ) {
                        weatherListCity.textContent =
                            currentCity + " " + today.format("MM.DD.YYYY") + " 🌩️";
                    } else if (
                        weather === "rain and snow" || "light rain and snow" || "shower snow" || "heavy shower snow" || "very light snow" || "light snow" || "snow"
                    ) {
                        weatherListCity.textContent =
                            currentCity + " " + today.format("MM.DD.YYYY") + " 🌨️";
                    } else {
                        weatherListCity.textContent =
                            currentCity + " " + today.format("MM.DD.YYYY");
                    }
                });
            var futureWeatherQueryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial";
            fetch(futureWeatherQueryURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    var timeStampArray = data.list;
                    futureWeatherDiv.innerHTML = "";
                    var fiveDayForecast = document.createElement("h4");
                    fiveDayForecast.setAttribute("id", "forecast-title");
                    fiveDayForecast.textContent = "5 Day Forecast:"
                    futureWeatherDiv.appendChild(fiveDayForecast);
                    for (var i = 7; i < timeStampArray.length; i += 8) {
                        var indexTimeStamp = timeStampArray[i];
                        var cardEl = document.createElement("section");
                        var dateEl = document.createElement("h5");
                        var emojiEl = document.createElement("p");
                        var currentWeatherEl = document.createElement("p");
                        var tempEl = document.createElement("p");
                        var windEl = document.createElement("p");
                        var humidityEl = document.createElement("p");
                        cardEl.setAttribute("class", "forecast-card");
                        dateEl.setAttribute("class", "forecast-date");
                        emojiEl.setAttribute("class", "forecast-items");
                        emojiEl.setAttribute("id", "forecast-emoji");
                        currentWeatherEl.setAttribute("class", "forecast-items");
                        tempEl.setAttribute("class", "forecast-items");
                        windEl.setAttribute("class", "forecast-items");
                        humidityEl.setAttribute("class", "forecast-items");
                        dateEl.textContent = dayjs.unix(indexTimeStamp.dt).format("MM.DD.YYYY");
                        currentWeatherEl.textContent = "Current Condition: " + indexTimeStamp.weather[0].description;
                        tempEl.textContent = "Temp: " + indexTimeStamp.main.temp + " degrees F";
                        windEl.textContent = "Wind: " + indexTimeStamp.wind.speed + " mph";
                        humidityEl.textContent = "Humidity " + indexTimeStamp.main.humidity + " %";
                        if (indexTimeStamp.weather[0].description === "scattered clouds") {
                            emojiEl.textContent = "🌥️";
                        } else if (indexTimeStamp.weather[0].description === "clear sky") {
                            emojiEl.textContent = "☀️";
                        } else if (indexTimeStamp.weather[0].description === "few clouds") {
                            emojiEl.textContent = "🌤️";
                        } else if (indexTimeStamp.weather[0].description === "broken clouds") {
                            emojiEl.textContent = "🌥️";
                        } else if (indexTimeStamp.weather[0].description === "overcast clouds") {
                            emojiEl.textContent = "☁️";
                        } else if (indexTimeStamp.weather[0].description === "light rain" || "moderate rain" || "heavy rain") {
                            emojiEl.textContent = "🌧️";
                        } else if (indexTimeStamp.weather[0].description === "thunderstorm with light rain" || "thunderstorm with rain" || "thunderstorm with heavy rain" || "light thunderstorm" || "thunderstorm" || "heavy thunderstorm") {
                            emojiEl.textContent = "⛈️";
                        } else if (indexTimeStamp.weather[0].description === "rain and snow" || "light rain and snow" || "shower snow" || "heavy shower snow" || "very light snow" || "light snow" || "snow") {
                            emojiEl.textContent = "🌨️";
                        } else {
                            emojiEl.textContent = " ";
                        }
                        cardEl.appendChild(dateEl);
                        cardEl.appendChild(emojiEl);
                        cardEl.appendChild(currentWeatherEl);
                        cardEl.appendChild(tempEl);
                        cardEl.appendChild(windEl);
                        cardEl.appendChild(humidityEl);
                        futureWeatherDiv.appendChild(cardEl);
                    }
                });
        });
}

function storeSearchHistory() {
    var inputVal = cityInputEl.value;
    var city = inputVal
    if (inputVal === "") {
        return;
    }

    if(!searchHistory.map(obj => obj.city).includes(city)) {
        searchHistory.push(inputVal)}

    cityInputEl.value = "";
    localStorage.setItem("cities", JSON.stringify(searchHistory));
    renderSearchHistory();
}

function renderSearchHistory() {
    searchHistoryDiv.innerHTML = "";
    var hr = document.createElement("hr");
    hr.setAttribute("style", "margin: 30px 15px 30px 15px");
    searchHistoryDiv.appendChild(hr);

    for (var i = 0; i < searchHistory.length; i++) {
        var storedCity = searchHistory[i];
        var li = document.createElement("li");
        li.textContent = storedCity;
        li.setAttribute("class", "stored-cities");
        searchHistoryDiv.appendChild(li);

        li.addEventListener("click", function (event) {
            var city = event.target.innerText;
            getWeather(city);
        });
    }
}

function init() {
    var storedCities = JSON.parse(localStorage.getItem("cities"));
    if (storedCities !== null) {
        searchHistory = storedCities;
    }
    renderSearchHistory();
}

init();

button.addEventListener("click", function () {
    getWeather();
});
