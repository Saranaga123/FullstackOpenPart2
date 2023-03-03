import axios from 'axios';

const baseUrl = 'https://restcountries.com/v2';

const getCountries = () => {
  const request = axios.get(`${baseUrl}/all`);
  return request.then(response => response.data);
}

const countriesAPI = {
  getCountries: getCountries,
};

export default countriesAPI;