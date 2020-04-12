import {CountryCodes} from './countryCodes';
import {Population} from '../../src/types';

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

//---------
type DayCovid = {
  date: string;
  confirmed: number;
  deaths: number;
  recovered: number;
};

type Timeline = {
  [k: string]: Array<DayCovid>;
};

// transform array to object
const dictionaryCountriesDetails = (countriesDetails: Array<CountryDetail>) =>
  countriesDetails.reduce(
    (acc: {[name: string]: CountryDetail}, item: CountryDetail) => ({
      ...acc,
      [item.alpha2Code]: item,
    }),
    {}
  );

const dictionaryPopulation = (population: any, countryCodes: CountryCodes) =>
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
  countriesDetails: Array<CountryDetail>,
  countriesCovid: Array<CountryCovid>,
  countryCodes: CountryCodes,
  population: any
) => {
  const dictionaryDetails = dictionaryCountriesDetails(countriesDetails);
  const dictionaryP = dictionaryPopulation(population, countryCodes);

  return countriesCovid.reduce(
    (acc: Array<CountryCovid>, countryItem: CountryCovid) => {
      const {totalCases, name} = countryItem;
      const countryCode = countryCodes[name];

      if (!countryCode) {
        // Missing:
        //  Diamond Princess
        //  MS Zaandam
        //  CAR
        return acc;
      }

      const population = dictionaryP[countryCode].totalPopulation || 0;
      const {flag, latlng} = dictionaryDetails[countryCode];
      const percentage = getPercentage(population, totalCases).toFixed(5);

      const enhancedCountry = {
        ...countryItem,
        flag,
        latlng,
        percentage,
        countryCode,
        population,
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

  // const countryReferal = countryHistories.FR.history;
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
  dictionaryCountriesDetails,
  getPercentage,
  enhanceCountries,
  toCountryCodeKeys,
};
