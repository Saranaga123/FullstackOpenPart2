import React, { useState, useEffect } from 'react';
import countriesAPI from './countriesAPI';
const Filter = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="filter">Find countries:</label>
      <input
        id="filter"
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
const Country = ({ country }) => {
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const apiKey = '7fe19c96db9a4047ac7152441230303';
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${country.capital}&aqi=no`;
    
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => setWeatherData(data))
    .catch(error => console.error(error));
}, [country]);

return (
  <div>
    <h2>{country.name}</h2>
    <p>Capital: {country.capital}</p>
    <p>Population: {country.population}</p>
    <h3>Languages:</h3>
    <ul>
      {country.languages.map((language) => (
        <li key={language.iso639_1}>{language.name}</li>
      ))}
    </ul>
    <img src={country.flag} alt={`${country.name} flag`} style={{ height: '100px' }} /> 
    {weatherData.current && (
      <div>
        <h3>Weather in {country.capital}</h3>
        <p>Temperature: {weatherData.current.temp_c} °C</p>
        <p>Condition: {weatherData.current.condition.text}</p>
        <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
      </div>
    )}
  </div>
);
};
const OnlyCountryName = ({ country }) => {
  return (
    <div>
      <p>{country.name}</p> 
    </div>
  );
};
const CountryList = ({ countries }) => {
  return (
    <div>
      {countries.map((country) => (
        <Country key={country.alpha3Code} country={country} />
      ))}
    </div>
  );
}; 
const OnlyCountryList = ({ countries }) => {
  return (
    <div>
      {countries.map((country) => (
        <OnlyCountryName key={country.alpha3Code} country={country} />
      ))}
    </div>
  );
}; 
const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    countriesAPI.getCountries().then((data) => setCountries(data));
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const countriesToShow = filter
    ? countries.filter((country) =>
        country.name.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange} />
      {countriesToShow.length === 1 ? (
        <Country country={countriesToShow[0]} />
      ) : countriesToShow.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ): countriesToShow.length < 10 ? (
        <OnlyCountryList countries={countriesToShow} />
      ) : countriesToShow.length <= 1 && (
        <CountryList countries={countriesToShow} />
      )}
    </div>
  );
};

export default App;