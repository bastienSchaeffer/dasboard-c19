import {CountryCodes} from './countryCodes';

type CountryCovid = {
  country: string;
  cases: number;
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
  [k?: string]: any;
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

// calculate percentage
const getPercentage = (total: number, amount: number): number =>
  (amount * 100) / total;

// Merge flags and covid
const enhanceCountries = (
  countriesDetails: Array<CountryDetail>,
  countriesCovid: Array<CountryCovid>,
  countryCodes: CountryCodes
) => {
  const dictionaryDetails = dictionaryCountriesDetails(countriesDetails);
  return countriesCovid.reduce(
    (acc: Array<CountryCovid>, countryItem: CountryCovid) => {
      const {cases, country} = countryItem;
      const countryCode = countryCodes[country];

      if (!countryCode) {
        return acc;
      }

      const {flag, population} = dictionaryDetails[countryCode];
      const percentage = getPercentage(population, cases).toFixed(5);
      const enhancedCountry = {
        ...countryItem,
        flag,
        population,
        percentage,
      };
      return [...acc, enhancedCountry];
    },
    []
  );
};

export {dictionaryCountriesDetails, getPercentage, enhanceCountries};
