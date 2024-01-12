import React, { useState, useEffect } from "react";
import "../styles/EmpDashboard.css"; // Import the CSS file for styling
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";

const EmpDashboard = () => {
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState([]);
  const [ip, setIp] = useState("");
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const name = localStorage.getItem("name");

  useEffect(() => {
    if(!name)
    navigate('/emp-signin')
  })

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
    // return 'sunny';
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

  // Dummy data for performance chart
  const performanceData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      {
        label: "Performance",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(54, 162, 235, 0.8)",
        hoverBorderColor: "rgba(54, 162, 235, 1)",
        data: [12, 19, 3, 5, 2, 3, 10], 
      },
    ],
  };

  // Dummy data for insights pie chart
  const insightsData = {
    labels: ["Meetings", "Tasks Completed", "Tasks Pending"],
    datasets: [
      {
        data: [30, 50, 20], 
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  //dummy data for recentActs
  const recentActivities = [
    "Reviewed financial reports",
    "Attended team meeting",
    "Completed project milestone",
  ];

  // Dummy data for notifications
  const notifications = [
    "New task assigned",
    "Meeting reminder",
    "Project deadline approaching",
  ];

 // Dummy data for mini-calendar 
 const miniCalendar = [
  { date: "2024-01-01", event: "Holiday" },
  { date: "2024-01-02", event: "Team Meeting" },
  { date: "2024-01-04", event: "Project Kickoff" },
  { date: "2024-01-05", event: "Client Presentation" },
  { date: "2024-01-08", event: "Training Session" },
  { date: "2024-01-10", event: "Product Launch" },
  { date: "2024-01-12", event: "Deadline - Report Submission" },
  { date: "2024-01-15", event: "Conference" },
  { date: "2024-01-18", event: "Quarterly Review" },
  { date: "2024-01-20", event: "Project Milestone" },
  { date: "2024-01-22", event: "Customer Visit" },
  { date: "2024-01-25", event: "Workshop" },
  { date: "2024-01-26", event: "Training" },
  { date: "2024-01-28", event: "Team Building" },
  { date: "2024-01-29", event: "Feedback Session" },
  { date: "2024-01-30", event: "Product Demo" },
  { date: "2024-01-31", event: "Project Review" },
];

  const keyStats = [
    { label: "Tasks Completed", value: 45 },
    { label: "Pending Tasks", value: 10 },
    { label: "Meetings Attended", value: 8 },
  ];

  const achievements = [
    "Employee of the Month - January",
    "Outstanding Performance Award",
  ];

  // Dummy data for important resources (links)
  const importantResources = [
    { label: "Employee Handbook", link: "/handbook" },
    { label: "Training Materials", link: "/training" },
    { label: "Company Policies", link: "/policies" },
  ];

  const logoutEmp = () => {
    const confirmation = window.confirm("Are you sure you want to logout?");
    if (!confirmation) {
      return;
    }
    localStorage.clear();
    navigate("/");
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
              {getWeatherClassName(weatherData.weather[0].id)}
            </p>
          ) : (
            <p className="weather-data color-bg">Weather: {weather}°C</p>
          )}
        </div>
        <div className="emp-name">
          <p className="color-bg">
            {getGreetingMessage()}, <strong>{name}</strong>
          </p>
          <p className="color-bg">{ip}</p>
        </div>
      </div>
      <div className="main-ui">
        <div className="navbar-left">
          <ul className="main-ul">
            <li className="li-option">
              <Link to="/emp-dashboard">Dashboard</Link>
            </li>
            <hr />
            <li className="li-option">
              <Link to="/emp-leave">Leave</Link>
            </li>
            <hr />
            <li className="li-option">
              <Link to="/emp-profile">My Profile</Link>
            </li>
            <hr />
            <li className="logout li-option">
              <button className="logout-btn" onClick={() => logoutEmp()}>
                Logout
              </button>
            </li>
          </ul>
        </div>
        <div className="dashboard-wrapper dash-container">
            <h2>Welcome, {name}</h2>
          <div className="performance-chart">
            <h3>Last 7 Days Performance</h3>
            <Bar
            className="bar-infi"
              data={performanceData}
              options={{
                maintainAspectRatio: false,
                scales: {
                  beginAtZero: false,
                },
              }}
            />
          </div>
          <div className="insights-chart">
            <h3>Insights</h3>
            <Pie
            className="pie-infi"
              data={insightsData}
              options={{
                maintainAspectRatio: false,
              }}
            />
          </div>
          <div className="recent-activities">
          <h3>Recent Activities</h3>
          <ul>
            {recentActivities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </div>

        {/* Notifications */}
        <div className="notifications">
          <h3>Notifications</h3>
          <ul>
            {notifications.map((notification, index) => (
              <li key={index}>{notification}</li>
            ))}
          </ul>
        </div>

        {/* Mini-Calendar */}
        <div className="mini-calendar">
          <h3>Calendar</h3>
          <ul>
            {miniCalendar.map((event, index) => (
              <li key={index}>
                {event.date} - {event.event}
              </li>
            ))}
          </ul>
        </div>

        {/* Key Statistics */}
        <div className="key-stats">
          <h3>Key Statistics</h3>
          <ul>
            {keyStats.map((stat, index) => (
              <li key={index}>
                {stat.label}: {stat.value}
              </li>
            ))}
          </ul>
        </div>

        {/* Achievements */}
        <div className="achievements">
          <h3>Achievements</h3>
          <ul>
            {achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </div>

        {/* Important Resources */}
        <div className="important-resources">
          <h3>Important Resources</h3>
          <ul>
            {importantResources.map((resource, index) => (
              <li key={index}>
                <a href={resource.link}>{resource.label}</a>
              </li>
            ))}
          </ul>
        </div>
        </div>
      </div>
    </>
  );
};

export default EmpDashboard;
