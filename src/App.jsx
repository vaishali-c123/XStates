import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
const App = () => {
  const [data, setData] = useState({
    countries: [],
    state: [],
    city: [],
  });
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  useEffect(() => {
    const fetchCounteries = async () => {
      try {
        const countriesUrl =
          "https://crio-location-selector.onrender.com/countries";
        const res = await axios(countriesUrl, {
          Method: "GET",
        });
        const data = await res.data;
        setData((prev) => ({ ...prev, countries: data }));
      } catch (e) {
        console.error(e);
      }
    };
    fetchCounteries();
  }, []);
  useEffect(() => {
    if (!selectedCountry) return;

    const stateUrl = `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`;
    const getStates = async () => {
      try {
        const response = await axios(stateUrl, {
          Method: "GET",
        });
        const data = await response.data;
        setData((prev) => ({ ...prev, state: data }));
      } catch (err) {
        console.error(err);
      }
    };

    getStates();
  }, [selectedCountry]);
  useEffect(() => {
    if (!selectedState) return;
    const stateUrl = `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`;
    const getStates = async () => {
      try {
        const response = await axios(stateUrl, {
          Method: "GET",
        });
        const data = await response.data;
        setData((prev) => ({ ...prev, city: data }));
      } catch (err) {
        console.error(err);
      }
    };
    getStates();
  }, [selectedState]);
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setSelectedCity("");
    setSelectedState("");
  };
  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSelectedCity("");
  };
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };
  return (
    <div className="container">
      <h1>Select Location</h1>
      <div className="selectContainer">
        <select value={selectedCountry} onChange={handleCountryChange}>
          <option value="" disabled>
            Choose Country
          </option>
          {data.countries?.map((ele, id) => (
            <option key={id} value={ele}>
              {ele}
            </option>
          ))}
        </select>
        <select
          value={selectedState}
          onChange={handleStateChange}
          disabled={!selectedCountry}
        >
          <option value="" disabled>
            Choose State
          </option>
          {data.state?.map((ele, id) => (
            <option key={id} value={ele}>
              {ele}
            </option>
          ))}
        </select>
        <select
          value={selectedCity}
          onChange={handleCityChange}
          disabled={!selectedState}
        >
          <option value="" disabled>
            Choose City
          </option>
          {data.city?.map((ele, id) => (
            <option key={id} value={ele}>
              {ele}
            </option>
          ))}
        </select>
      </div>

      {selectedCity && (
        <h4>
          You selected <span className="selectCity">{selectedCity}, </span>
          <span>
            {selectedState}, {selectedCountry}
          </span>
        </h4>
      )}
    </div>
  );
};
export default App;
