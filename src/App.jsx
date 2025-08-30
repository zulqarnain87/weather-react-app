import { useState } from "react";
import "./App.css";


function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "0fd75992988554c38ef07442139ac0e4";

  async function fetchWeather() {
    if (!city) return;

    try {
      setError("");
      setWeather(null);

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${`0fd75992988554c38ef07442139ac0e4`}&units=metric`
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "City not found");
      }

      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError("❌ " + err.message);
    }
  }

  
  return (
    <div className="app">
      <h1 className="title">🌦 Weather App</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="temp">🌡 {weather.main.temp} °C</p>
          <p>☁ {weather.weather[0].description}</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌬 Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}


export default App;
