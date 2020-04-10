import axios from 'axios';
import clientRedis from './redis';
import {countryCodes} from '../utils/countryCodes';
import {enhanceCountries, toCountryCodeKeys} from '../utils/countries';
import {
  getWDMCovidContinents,
  getWDMCovidCountries,
  getWDMCovidWorld,
  getWDMPopulation,
} from '../scraping/worldometers';
import {Continent} from '../types';

/*
 * Get the world covid data
 */
const getWorld = async () => {
  const data = await getWDMCovidWorld();
  clientRedis.set('world', JSON.stringify(data[0]));
};

/*
 * Get the continents covid data
 */
const getContinents = async () => {
  const data = await getWDMCovidContinents();
  // Remove world retrieved as continent
  const withoutWorld = data
    .filter((continent: Continent) => continent.continent !== 'All')
    .sort(function (a: any, b: any) {
      return b.totalCases - a.totalCases;
    });
  clientRedis.set('continents', JSON.stringify(withoutWorld));
};

/*
 * Get the population/flags data
 */
const getCountriesDetails = async () => {
  return axios
    .get('https://restcountries.eu/rest/v2/all')
    .then((response) => response.data);
};

/*
 * Get the countries covid data
 */
const getCountriesCovid = async () => {
  return getWDMCovidCountries();
};

/*
 * Get the world population
 */
const getPopulation = async () => {
  return getWDMPopulation();
};

/*
 * Get the countries covid data associated to the flags/population
 */
const getCountries = async () => {
  axios.all([getCountriesDetails(), getCountriesCovid(), getPopulation()]).then(
    axios.spread((countriesDetails, countriesCovid, population) => {
      const enhancedCountries = enhanceCountries(
        countriesDetails,
        countriesCovid,
        countryCodes,
        population
      ).sort((a: any, b: any) => b.cases - a.cases);
      clientRedis.set('countries', JSON.stringify(enhancedCountries));
    })
  );
};

/*
 * Get the countries covid data with corresponding timeline evolution
 */
const getTimeline = async () => {
  const res = await axios.get(
    'https://pomber.github.io/covid19/timeseries.json'
  );
  const {data} = await res;
  const keyedWithCountryCode = toCountryCodeKeys(data, countryCodes);
  clientRedis.set('timeline', JSON.stringify(keyedWithCountryCode));
};

/*
 * Set Redis health check
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
  getContinents();
  getCountries();
  getTimeline();
  setHealth();
};

export {covidTimeSeriesAPIData};
