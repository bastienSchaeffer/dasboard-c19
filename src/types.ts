export type Country = {
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
  flag: string;
  population: number;
  percentage: string;
  countryCode: string;
  latlng: Array<number>;
  mediumAge: number | string;
};

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

export type Population = {
  index: number;
  name: string;
  totalPopulation: number;
  yearlyChange: number;
  netChange: number;
  densityPerKm: number;
  landArea: number;
  migrants: number;
  fertilityRate: number;
  mediumAge: number;
  urbanPopulation: number;
  worldShare: number;
};
