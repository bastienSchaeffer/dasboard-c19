import axios from 'axios';
import clientRedis from './redis';
import {countryCodes} from '../utils/countryCodes';
import {enhanceCountries} from '../utils/countries';

/*
 * Get the 4 main data World
 */
const getWorld = async () => {
  const res = await axios.get('http://api.coronastatistics.live/all');
  const {data} = await res;
  clientRedis.set('world', JSON.stringify(data));
  console.log(`==> World retrieved`);
};

/*
 * Get the population/flags
 */
const getCountriesDetails = async () => {
  return axios
    .get('https://restcountries.eu/rest/v2/all')
    .then((response) => response.data);
};

/*
 * Get the countries covid data detailed by country
 */
const getCountriesCovid = async () => {
  return axios
    .get('http://api.coronastatistics.live/countries')
    .then((response) => response.data);
};

/*
 * Get all countries data to enhance every country (flags/population/percentage)
 */
const getCountries = async () => {
  axios.all([getCountriesDetails(), getCountriesCovid()]).then(
    axios.spread((countriesDetails, countriesCovid) => {
      const enhancedCountries = enhanceCountries(
        countriesDetails,
        countriesCovid,
        countryCodes
      ).sort((a: any, b: any) => b.cases - a.cases);
      console.log(`==> Countries retrieved`);
      clientRedis.set('countries', JSON.stringify(enhancedCountries));
    })
  );
};

/*
 * Get the entire timeline with detailed timeline per country
 */
const getTimeline = async () => {
  const res = await axios.get(
    'https://pomber.github.io/covid19/timeseries.json'
  );
  const {data} = await res;
  clientRedis.set('timeline', JSON.stringify(data));
  console.log(`==> Timeline retrieved`);
};

/*
 * Simple way to check Redis update
 */
const setHealth = () => {
  clientRedis.set(
    'health',
    JSON.stringify({
      origin: 'redis',
      date: new Date(),
    })
  );
  console.log(`==> Health: ${new Date()}`);
};
const covidTimeSeriesAPIData = async () => {
  getWorld();
  getCountries();
  getTimeline();
  setHealth();
};

export {covidTimeSeriesAPIData};
