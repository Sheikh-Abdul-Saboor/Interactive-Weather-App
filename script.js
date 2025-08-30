async function getWeather() {
    const city = document.getElementById("city").value;
    const apiKey = "f3aed8e2b05599a4ac9d76f69bbec33c"; // replace with your OpenWeatherMap API key
  
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  
    const resultDiv = document.getElementById("weather-result");
    const forecastDiv = document.getElementById("forecast");
    const forecastTitle = document.getElementById("forecast-title");
  
    try {
      // Current Weather
      const response = await fetch(currentUrl);
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
  
      resultDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>🌡 Temperature: ${data.main.temp}°C</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬 Wind: ${data.wind.speed} m/s</p>
        <p>☁ Condition: ${data.weather[0].description}</p>
      `;
  
      // 5-Day Forecast
      const forecastResponse = await fetch(forecastUrl);
      const forecastData = await forecastResponse.json();
  
      forecastDiv.innerHTML = "";
      forecastTitle.innerText = "5-Day Forecast";
  
      // Pick one forecast per day at 12:00:00
      const dailyData = forecastData.list.filter(item => item.dt_txt.includes("12:00:00"));
  
      dailyData.forEach(day => {
        const date = new Date(day.dt * 1000);
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        const formattedDate = date.toLocaleDateString(undefined, options);
  
        const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
  
        const forecastHTML = `
          <div class="forecast-day">
            <h4>${formattedDate}</h4>
            <img src="${icon}" alt="${day.weather[0].description}">
            <p>${day.main.temp}°C</p>
            <p>${day.weather[0].description}</p>
          </div>
        `;
        forecastDiv.innerHTML += forecastHTML;
      });
  
    } catch (error) {
      resultDiv.innerHTML = `<p style="color:red;">❌ ${error.message}</p>`;
      forecastDiv.innerHTML = "";
      forecastTitle.innerText = "";
    }
  }
  