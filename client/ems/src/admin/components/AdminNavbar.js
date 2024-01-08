import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../employee/styles/EmpDashboard.css'

export default function AdminNavbar() {
  
    const [ip, setIp] = useState("");
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState("");
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
      const url = "https://ipinfo.io?token=66450f50d93a31";
      axios
        .get(url)
        .then((res) => {
          setCity(res.data.city);
          setIp(res.data.city + ", " + res.data.region);
        })
        .catch((err) => {
          setIp(err);
        });
    }, []);
  
    useEffect(() => {
      const key = "e9ec1cbc48ff6816d7563a0faf5e7464";
      const wurl = `http://api.openweathermap.org/data/2.5/weather?appid=${key}&q=${city}`;
    //   const wurl = `http://api.openweathermap.org/data/2.5/weather?appid=${key}&q=tokyo`;
      axios
        .get(wurl)
        .then((res) => {
          setWeatherData(res.data);
          const temperatureInKelvin = res.data.main.temp;
          const temperatureInCelsius = temperatureInKelvin - 273.15;
          setWeather(temperatureInCelsius.toFixed(1));
        })
        .catch((err) => {
          console.log("Error fetching weather data", err);
        });
    }, [city]);
  
    function getWeatherClassName(weatherCode) {
      let className = "";
      if (weatherCode >= 200 && weatherCode < 300) {
        className = "thunderstorm";
      } else if (weatherCode >= 300 && weatherCode < 400) {
        className = "drizzle";
      } else if (weatherCode >= 500 && weatherCode < 600) {
        className = "rainy";
      } else if (weatherCode >= 600 && weatherCode < 700) {
        className = "snow";
      } else if (weatherCode === 800) {
        className = "sunny";
      } else if (weatherCode > 800 && weatherCode < 900) {
        className = "cloudy";
      } else {
        className = "Clear";
      }
      return className;
      // return 'snow';
    }
  
    function getGreetingMessage() {
      const currentTime = new Date().getHours();
      let greeting = "";
      if (currentTime < 12) {
        greeting = "Good Morning";
      } else if (currentTime >= 12 && currentTime < 18) {
        greeting = "Good Afternoon";
      } else {
        greeting = "Good Evening";
      }
      return greeting;
    }

    return(
        <>
            <div
        className={`weather-container ${
          weatherData ? getWeatherClassName(weatherData.weather[0].id) : ""
        }`}
        style={{
          backgroundSize: "cover",
        }}
      >
        <h2 className="logo color-bg">SYN <span>EMS</span></h2>
        <div className="weather">
          {weatherData &&
          weatherData.weather &&
          weatherData.weather.length > 0 ? (
            <p className="weather-data color-bg">
              Weather: {weather}°C,{" "}
              {getWeatherClassName(weatherData.weather[0].id)}
            </p>
          ) : (
            <p className="weather-data color-bg">Weather: {weather}°C</p>
          )}
        </div>
        <div className="emp-name">
          <p className="color-bg">
            {getGreetingMessage()}, <strong>Admin</strong>
          </p>
          <p className="color-bg">{ip}</p>
        </div>
      </div>
        </>
    );
}