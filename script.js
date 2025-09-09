async function getWeather() {
    const city = document.getElementById("city").value;
    const apiKey = "f3aed8e2b05599a4ac9d76f69bbec33c"; // replace with your OpenWeatherMap API key
  
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  
    const resultDiv = document.getElementById("weather-result");
    const forecastDiv = document.getElementById("forecast");
    const forecastTitle = document.getElementById("forecast-title");
    const loading = document.getElementById("loading");
  
    // Show loader
    loading.style.display = "block";
    resultDiv.innerHTML = "";
    forecastDiv.innerHTML = "";
    forecastTitle.innerText = "";
  
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
  
      // Forecast
      const forecastResponse = await fetch(forecastUrl);
      const forecastData = await forecastResponse.json();
  
      forecastTitle.innerText = "5-Day Forecast";
  
      const dailyData = forecastData.list.filter(item =>
        item.dt_txt.includes("12:00:00")
      );
  
      dailyData.forEach((day, index) => {
        const date = new Date(day.dt * 1000);
        const options = { weekday: "short", month: "short", day: "numeric" };
        const formattedDate = date.toLocaleDateString(undefined, options);
  
        const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
  
        const forecastHTML = `
          <div class="forecast-day" style="animation-delay: ${index * 0.2}s">
            <h4>${formattedDate}</h4>
            <img src="${icon}" alt="${day.weather[0].description}">
            <p>${day.main.temp.toFixed(1)}°C</p>
            <p>${day.weather[0].description}</p>
          </div>
        `;
        forecastDiv.innerHTML += forecastHTML;
      });
    } catch (error) {
      resultDiv.innerHTML = `<p style="color:red;">❌ ${error.message}</p>`;
    } finally {
      // Hide loader
      loading.style.display = "none";
    }
  }
  
