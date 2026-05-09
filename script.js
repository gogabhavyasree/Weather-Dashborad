const apiKey = "255a2297719dcae331c0ebb7e7a139ae";

async function getWeather() {

  const city = document.getElementById("cityInput").value;

  if(city === ""){
    alert("Please enter city name");
    return;
  }

  const weatherURL =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const forecastURL =
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {

    // Current Weather
    const weatherResponse = await fetch(weatherURL);
    const weatherData = await weatherResponse.json();

    if(weatherData.cod != 200){
      alert(weatherData.message);
      return;
    }

    document.getElementById("cityName").innerText =
      weatherData.name;

    document.getElementById("temperature").innerText =
      `${Math.round(weatherData.main.temp)}°C`;

    document.getElementById("description").innerText =
      weatherData.weather[0].description;

    document.getElementById("humidity").innerText =
      `${weatherData.main.humidity}%`;

    document.getElementById("wind").innerText =
      `${weatherData.wind.speed} km/h`;

    const icon =
      `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

    document.getElementById("weatherIcon").src = icon;


    // 5 Day Forecast
    const forecastResponse = await fetch(forecastURL);
    const forecastData = await forecastResponse.json();

    const forecastContainer =
      document.getElementById("forecastContainer");

    forecastContainer.innerHTML = "";

    const dailyForecasts =
      forecastData.list.filter(item =>
        item.dt_txt.includes("12:00:00")
      );

    dailyForecasts.forEach(day => {

      const date = new Date(day.dt_txt);

      const card = document.createElement("div");

      card.classList.add("forecast-card");

      card.innerHTML = `
        <h4>${date.toDateString().split(" ")[0]}</h4>

        <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png">

        <p>${Math.round(day.main.temp)}°C</p>

        <p>${day.weather[0].main}</p>
      `;

      forecastContainer.appendChild(card);

    });

  }

  catch(error){
    console.log(error);
    alert("Something went wrong");
  }

}