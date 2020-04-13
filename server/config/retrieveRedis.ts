import clientRedis from './redis';
import axios from 'axios';

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
  setHealth();
  console.log('=-=-=-=-=-=-=- Latest global: ${new Date()}');
};

export {covidTimeSeriesAPIData};
