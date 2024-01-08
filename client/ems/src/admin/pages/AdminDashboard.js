import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/AdminDashboard.css";
import Chart from "chart.js/auto";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // To keep track of the chart instance

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

  const [employeeSalaryData, setEmployeeSalaryData] = useState([]);

  // useEffect to fetch employee salary data from the backend
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get("http://localhost:9000/getAllStaff");
        setEmployeeSalaryData(response.data);

        // Process the received data here if needed
      } catch (error) {
        console.error("Error fetching Employee Data:", error);
      }
    };

    fetchEmployeeData();
  }, []);

  useEffect(() => {
    console.log(employeeSalaryData);
    if (employeeSalaryData.length > 0) {
      const sortedSalaryData = employeeSalaryData.sort(
        (a, b) => b.salary - a.salary
      );

      const topFiveEmployees = sortedSalaryData.slice(0, 5);
      const employeeNames = topFiveEmployees.map(
        (employee) => employee.fName + " " + employee.lName
      );
      const employeeSalaries = topFiveEmployees.map(
        (employee) => employee.salary
      );

      console.log("Top Five Employees:", topFiveEmployees);
      console.log("Employee Names:", employeeNames);
      console.log("Employee Salaries:", employeeSalaries);

      const ctx = chartRef.current.getContext("2d");

      if (chartInstance.current !== null) {
        chartInstance.current.destroy(); // Destroy the existing chart instance
      }

      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: employeeNames,
          datasets: [
            {
              label: "Salary",
              data: employeeSalaries,
              backgroundColor: [
                "rgba(255, 99, 132, 0.8)",
                "rgba(54, 162, 235, 0.8)",
                "rgba(255, 206, 86, 0.8)",
                "rgba(75, 192, 192, 0.8)",
                "rgba(153, 102, 255, 0.8)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
    // Ensure the chart instance is destroyed on component unmount
    return () => {
      if (chartInstance.current !== null) {
        chartInstance.current.destroy();
      }
    };
  }, [employeeSalaryData]);

  const [showDepartmentOptions, setShowDepartmentOptions] = useState(false);
  const [showStaffOptions, setShowStaffOptions] = useState(false);

  const toggleDepartmentOptions = () => {
    setShowDepartmentOptions(!showDepartmentOptions);
    setShowStaffOptions(false); // Hide other dropdowns when this one is active
  };

  const toggleStaffOptions = () => {
    setShowStaffOptions(!showStaffOptions);
    setShowDepartmentOptions(false); // Hide other dropdowns when this one is active
  };
  return (
    <>
      <div
        className={`weather-container ${
          weatherData ? getWeatherClassName(weatherData.weather[0].id) : ""
        }`}
        style={{
          backgroundSize: "cover",
        }}
      >
        <h2 className="logo color-bg">
          SYN <span>EMS</span>
        </h2>
        <div className="weather">
          {weatherData &&
          weatherData.weather &&
          weatherData.weather.length > 0 ? (
            <p className="weather-data color-bg">
              Weather: {weather}°C,{" "}
              {weatherData.weather[0].id
                ? getWeatherClassName(weatherData.weather[0].id)
                : ""}
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
      <div className="main-ui">
        <div className="navbar-left">
          <ul className="main-ul">
            <li className="li-option">
              <Link to="/admin-dashboard">Dashboard</Link>
            </li>
            <hr />
            <li className="li-option" onClick={toggleDepartmentOptions}>
              Department
            </li>
            {showDepartmentOptions && (
              <ul className="dropdown">
                <hr className="drop-hr" />
                <li className="drop-option">
                  <Link to="/admin-add-department">Add Department</Link>
                </li>
                <li className="drop-option">
                  <Link to="#">Manage Department</Link>
                </li>
              </ul>
            )}
            <hr />
            <li className="li-option" onClick={toggleStaffOptions}>
              Staff
            </li>
            {showStaffOptions && (
              <ul className="dropdown">
                <hr className="drop-hr" />
                <li className="drop-option">
                  <Link to="/admin-add-staff">Add Staff</Link>
                </li>
                <li className="drop-option">
                  <Link to="#">Manage Staff</Link>
                </li>
                {/* Add more staff options here */}
              </ul>
            )}
            <hr />
            <li className="li-option">
              <Link to="#">Salary</Link>
            </li>
            <hr />
            <li className="li-option">
              <Link to="#">Leave</Link>
            </li>
            <hr />
            <li className="logout li-option">
              <Link to="#">Logout</Link>
            </li>
          </ul>
        </div>
        <div className="dashboard-body">
          <div className="chart-display">
            <canvas className="chart" ref={chartRef} />
          </div>

          <div className="dashboard-wrapper">
            <div className="box department"></div>
            <div className="box staff"></div>
            <div className="box leave"></div>
            <div className="box salary"></div>
          </div>
        </div>
      </div>
    </>
  );
}
