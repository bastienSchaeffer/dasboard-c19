import {CountryCodes} from './countryCodes';
import {Population} from '../types';

type CountryCovid = {
  name: string;
  totalCases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
};

type CountryDetail = {
  name: string;
  alpha2Code: string;
  population: number;
  flag: string;
  [k: string]: any;
};

type DayCovid = {
  date: string;
  confirmed: number;
  deaths: number;
  recovered: number;
};

type Timeline = {
  [k: string]: DayCovid[];
};

// transform array to object
const hashCountriesDetails = (countriesDetails: CountryDetail[]) =>
  countriesDetails.reduce(
    (acc: {[name: string]: CountryDetail}, item: CountryDetail) => ({
      ...acc,
      [item.alpha2Code]: item,
    }),
    {}
  );

const hashPopulation = (population: any, countryCodes: CountryCodes) =>
  population.reduce((acc: {[name: string]: any}, item: Population) => {
    // Missing:
    // Northern Mariana Islands
    if (!countryCodes[item.name]) {
      return acc;
    }
    return {
      ...acc,
      [countryCodes[item.name]]: item,
    };
  }, {});

// calculate percentage
const getPercentage = (total: number, amount: number): number =>
  (amount * 100) / total;

// Merge flags and covid
const enhanceCountries = (
  countriesDetails: CountryDetail[],
  countriesCovid: CountryCovid[],
  countryCodes: CountryCodes,
  population: any
) => {
  const dictionaryDetails = hashCountriesDetails(countriesDetails);
  const dictionaryPopulation = hashPopulation(population, countryCodes);

  return countriesCovid.reduce(
    (acc: CountryCovid[], countryItem: CountryCovid) => {
      const {totalCases, name} = countryItem;
      const countryCode = countryCodes[name];

      if (!countryCode) {
        // Missing:
        //  Diamond Princess
        //  MS Zaandam
        //  CAR
        return acc;
      }

      const population = dictionaryPopulation[countryCode].totalPopulation || 0;
      const mediumAge = dictionaryPopulation[countryCode].mediumAge || 'N/A';
      const {flag, latlng} = dictionaryDetails[countryCode];
      const percentage = getPercentage(population, totalCases).toFixed(5);

      const enhancedCountry = {
        ...countryItem,
        flag,
        latlng,
        percentage,
        countryCode,
        population,
        mediumAge,
      };
      return [...acc, enhancedCountry];
    },
    []
  );
};

const toCountryCodeKeys = (dataSet: Timeline, countryCodes: CountryCodes) => {
  const countryHistories = Object.keys(dataSet).reduce(
    (acc: any, item: any) => {
      if (!countryCodes[item]) {
        // Exceptions
        // Diamond Princess
        // MS Zaandam
        return acc;
      }
      // const newItem = {
      //   [countryCodes[item]]: {
      //     country: item,
      //     history: dataSet[item],
      //   },
      // };
      const newItem = {[countryCodes[item]]: dataSet[item]};
      return {...acc, ...newItem};
    },
    {}
  );

  if (countryHistories.FR) {
    // const countryReferal = countryHistories.FR.history;
    console.log('-------> LENGTH SLIDER');
    console.log(countryHistories.FR.length);
  }

  const dataContract = {
    // updated: new Date(),
    // startDate: countryReferal[0].date,
    // endDate: countryReferal[countryReferal.length - 1].date,
    // totalDays: countryReferal.length,
    ...countryHistories,
  };

  return dataContract;
};

export {
  hashCountriesDetails,
  hashPopulation,
  getPercentage,
  enhanceCountries,
  toCountryCodeKeys,
};
