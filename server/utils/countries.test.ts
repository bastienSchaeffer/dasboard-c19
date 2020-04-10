import {
  dictionaryCountriesDetails,
  getPercentage,
  enhanceCountries,
} from './countries';

describe(`dictionaryCountriesDetails`, () => {
  const dataCountries = [
    {
      name: 'Country name',
      alpha2Code: 'CN',
      population: 100,
      flag: 'pathFlag.svg',
    },
  ];

  it(`should return a hash map object`, () => {
    const result = dictionaryCountriesDetails(dataCountries);
    const expectedResult = {
      CN: {
        name: 'Country name',
        alpha2Code: 'CN',
        population: 100,
        flag: 'pathFlag.svg',
      },
    };
    expect(result).toMatchObject(expectedResult);
  });
});

describe(`getPercentage`, () => {
  it(`should calculate the percentage`, () => {
    const result = getPercentage(1000, 500);
    expect(result).toEqual(50);
  });
});

describe(`enhanceCountries`, () => {
  const countryDetails = [
    {
      name: 'China',
      alpha2Code: 'CN',
      population: 1377422166,
      flag: 'pathFlag.svg',
    },
  ];
  const countries = [
    {
      country: 'China',
      cases: 81865,
      todayCases: 63,
      deaths: 3335,
      todayDeaths: 2,
      recovered: 77370,
      active: 1160,
      critical: 176,
      casesPerOneMillion: 57,
      deathsPerOneMillion: 2,
    },
  ];
  const countryCodes = {
    China: 'CN',
  };
  it(`should return an enhanced country when key exists in country codes`, () => {
    const result = enhanceCountries(countryDetails, countries, countryCodes);
    const expectedResult = [
      {
        active: 1160,
        cases: 81865,
        casesPerOneMillion: 57,
        country: 'China',
        critical: 176,
        deaths: 3335,
        deathsPerOneMillion: 2,
        flag: 'pathFlag.svg',
        percentage: '0.00594',
        population: 1377422166,
        recovered: 77370,
        todayCases: 63,
        todayDeaths: 2,
      },
    ];
    expect(result).toEqual(expectedResult);
  });

  it(`should not return a result if country code doesn't contain the country name`, () => {
    const countriesWithWrongCountryName = [
      {...countries[0], country: 'Wrong country name'},
    ];
    const result = enhanceCountries(
      countryDetails,
      countriesWithWrongCountryName,
      countryCodes
    );
    const expectedResult: any = [];
    expect(result).toEqual(expectedResult);
  });
});
