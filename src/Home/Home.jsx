import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { GoogleLogout } from "react-google-login";
import "./Home.css";

const Home = ({ setUser }) => {
  //ref to display the map in the screen
  const mapRef = useRef(null);
  //to get city name from the user
  const [cityName, setCityName] = useState("");
  //to store and display the citydetails.
  const [cityDetails, setCityDetails] = useState(null);

  useEffect(() => {
    // Initialize and add the map
    const initMap = async () => {
      try {
        // The location of New York
        const uluru = { lat: 40.7128, lng: -74.006 };
        // The map, centered at New York
        const map = new window.google.maps.Map(mapRef.current, {
          zoom: 10,
          center: uluru,
        });
        // The marker, positioned at New York
        const marker = new window.google.maps.Marker({
          position: uluru,
          map: map,
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (mapRef) {
      initMap();
    }
  }, []);

  const fetchCityDetails = async () => {
    const apiKey = "7d9925376dfc79f48e562127c9794956";
    const unit = "metric";
    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apiKey +
      "&units=" +
      unit;

    try {
      //to fetch data from openweathermap api
      const { data } = await axios.get(url);
      setCityDetails(data);
      const uluru = { lat: data.coord.lat, lng: data.coord.lon };
      // The map, centered at selected location by the user
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 10,
        center: uluru,
      });
      // The marker, positioned at selected location by the user
      const marker = new window.google.maps.Marker({
        position: uluru,
        map: map,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <div className="home">
      <div className="home__top">
        <h1>Search Data</h1>
        <GoogleLogout
          clientId="97601987605-ii58bvljlo9mf9k7n30aui51nb7fo0nj.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={logout}
        />
      </div>
      <div className="home__searchContainer">
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <button onClick={fetchCityDetails}>
          <img
            src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/320/facebook/327/magnifying-glass-tilted-left_1f50d.png"
            alt=""
          />
        </button>
      </div>
      {cityDetails && (
        <div className="home__cityDetails">
          <p>
            <strong>Temp: </strong>
            {cityDetails.main.temp}°C
          </p>
          <p>
            <strong>Weather Description: </strong>
            {cityDetails.weather[0].description}
          </p>
          <p>
            <strong>Sunrise: </strong>
            {new Date(cityDetails.sys.sunrise * 1000).toLocaleTimeString()}
          </p>
          <p>
            <strong>Sunset: </strong>
            {new Date(cityDetails.sys.sunset * 1000).toLocaleTimeString()}
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${cityDetails.weather[0].icon}@2x.png`}
            alt=""
          />
        </div>
      )}
      <h3>Location Map</h3>
      <div
        style={{
          height: 600,
          width: "100%",
        }}
        ref={mapRef}
      ></div>
    </div>
  );
};

export default Home;
