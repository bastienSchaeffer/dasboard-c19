import clientRedis from './redis';
import axios from 'axios';

const extractLatestCountries = (data: any) => {
  const filtered = Object.keys(data)
    .map((country) => {
      const dayData = data[country][data[country].length - 1];
      return {
        country: country,
        ...dayData,
      };
    })
    .sort((a, b) => b.confirmed - a.confirmed);

  clientRedis.set('timeseries', JSON.stringify(data));
  clientRedis.set('latestCountries', JSON.stringify(filtered));
  clientRedis.set(
    'dummyRedis',
    JSON.stringify({
      origin: 'redis',
      date: new Date(),
    })
  );

  console.log(`ALL REDIS SETUP: ${new Date()}`);
};

const covidTimeSeriesAPIData = async () => {
  try {
    axios
      .get('https://pomber.github.io/covid19/timeseries.json')
      .then((response) => extractLatestCountries(response.data));
  } catch (err) {
    console.log(err);
    return null;
  }
};

export {covidTimeSeriesAPIData};
