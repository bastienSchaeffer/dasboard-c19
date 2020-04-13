import clientRedis from './redis';
import axios from 'axios';
import {getWDMCovidContinents} from '../scraping/worldometers';

export type Continent = {
  name: string;
  totalCases: number;
  newCases: number;
  totalDeaths: number;
  newDeaths: number;
  totalRecovered: number;
  activeCases: number;
  seriousCritical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  totalTests: number;
  testsPerOneMillion: number;
  continent: string;
};

/*
 * Get the continents covid data
 */
const getContinents = async () => {
  const data = await getWDMCovidContinents();
  // Remove world retrieved as continent
  const withoutWorld = data.filter(
    (continent: Continent) => continent.continent !== 'All'
  );
  clientRedis.set('continents', JSON.stringify(withoutWorld));
};

const getWorld = async () => {
  let res = await axios.get('http://api.coronastatistics.live/all');
  let {data} = await res;
  clientRedis.set('world', JSON.stringify(data));
  console.log(`==> World retrieved`);
};

const getCountries = async () => {
  let res = await axios.get('http://api.coronastatistics.live/countries');
  let {data} = await res;
  clientRedis.set(
    'countries',
    JSON.stringify(data.sort((a: any, b: any) => b.cases - a.cases))
  );
  console.log(`==> Countries retrieved`);
};

const getTimeline = async () => {
  let res = await axios.get('https://pomber.github.io/covid19/timeseries.json');
  let {data} = await res;
  clientRedis.set('timeline', JSON.stringify(data));
  console.log(`==> Timeline retrieved`);
};

const setHealth = () => {
  clientRedis.set(
    'health',
    JSON.stringify({
      origin: 'redis',
      date: new Date(),
    })
  );
};
const covidTimeSeriesAPIData = async () => {
  getWorld();
  getCountries();
  getTimeline();
  getContinents();
  setHealth();
  console.log('=-=-=-=-=-=-=- Latest global: ${new Date()}');
};

export {covidTimeSeriesAPIData};
