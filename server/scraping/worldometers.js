const axios = require('axios');
const cheerio = require('cheerio');

const URL_WORLD_DO_METERS = `https://www.worldometers.info`;
const URL_COVID = `${URL_WORLD_DO_METERS}/coronavirus/`;
const URL_POPULATION = `${URL_WORLD_DO_METERS}/world-population/population-by-country/`;
const CHEERIO_CONFIG = {xml: {normalizeWhitespace: true}};

//------------------------------------------------------------
/*
 * Get formatted text value from text
 * @param {string} value
 */
const getTextValue = (value) => {
  return value.trim();
};

/*
 * Get formatted number value from text
 * @param {string} value
 */
const getNumberValue = (value) => {
  return parseInt(value.trim().replace(/,/g, ''), 10) || 0;
};

//------------------------------------------------------------
/*
 * Scrap main table @ https://www.worldometers.info/coronavirus/
 * @param {string} urlToScrap
 * @param {string} domSelector
 * @param {Object[]} configLabels
 * @param {string} configLabels.label - key name on the return data
 * @param {func} configLabels.format - format extracted data value (getTextValue | getNumberValue)
 */
const scrapMainTable = ({urlToScrap, domSelector, configLabels}) => {
  return (
    axios(urlToScrap)
      .then((response) => {
        const $ = cheerio.load(response.data, CHEERIO_CONFIG);
        const body = [];

        $(domSelector).each((index, item) => {
          // collect row cells
          const rowCells = [];
          $(item)
            .children('td')
            .text((indexTd, itemTd) => rowCells.push(itemTd));

          // format object to pass:
          const row = rowCells.reduce((acc, itemRowCell, indexRowCell) => {
            const {label, format} = configLabels[indexRowCell];
            return {...acc, [label]: format(itemRowCell)};
          }, {});

          // @todo: params required in labels
          if (row.name) {
            body.push(row);
          }
        });

        return body;
      })
      //tslint:disable-next-line no-console
      .catch(console.error)
  );
};

const labelsCovid = [
  {label: 'name', format: getTextValue},
  {label: 'totalCases', format: getNumberValue},
  {label: 'newCases', format: getNumberValue},
  {label: 'totalDeaths', format: getNumberValue},
  {label: 'newDeaths', format: getNumberValue},
  {label: 'totalRecovered', format: getNumberValue},
  {label: 'activeCases', format: getNumberValue},
  {label: 'seriousCritical', format: getNumberValue},
  {label: 'casesPerOneMillion', format: getNumberValue},
  {label: 'deathsPerOneMillion', format: getNumberValue},
  {label: 'totalTests', format: getNumberValue},
  {label: 'testsPerOneMillion', format: getNumberValue},
  {label: 'continent', format: getTextValue},
];

const labelsPopulation = [
  {label: 'index', format: getNumberValue},
  {label: 'name', format: getTextValue},
  {label: 'totalPopulation', format: getNumberValue},
  {label: 'yearlyChange', format: getNumberValue},
  {label: 'netChange', format: getNumberValue},
  {label: 'densityPerKm', format: getNumberValue},
  {label: 'landArea', format: getNumberValue},
  {label: 'migrants', format: getNumberValue},
  {label: 'fertilityRate', format: getNumberValue},
  {label: 'mediumAge', format: getNumberValue},
  {label: 'urbanPopulation', format: getNumberValue},
  {label: 'worldShare', format: getNumberValue},
];

// World
const getWDMCovidWorld = () =>
  scrapMainTable({
    urlToScrap: URL_COVID,
    domSelector: `#main_table_countries_today tbody tr.total_row_world:not(tr.row_continent)`,
    configLabels: labelsCovid,
  });

// Continents
const getWDMCovidContinents = () =>
  scrapMainTable({
    urlToScrap: URL_COVID,
    domSelector: `#main_table_countries_today tbody tr.total_row_world`,
    configLabels: labelsCovid,
  });

// Countries
const getWDMCovidCountries = () =>
  scrapMainTable({
    urlToScrap: URL_COVID,
    domSelector: `#main_table_countries_today tbody tr:not(tr.row_world, tr.row_continent, tr.total_row_world)`,
    configLabels: labelsCovid,
  });

// Population
const getWDMPopulation = () =>
  scrapMainTable({
    urlToScrap: URL_POPULATION,
    domSelector: `#example2 tbody tr`,
    configLabels: labelsPopulation,
  });

export {
  getWDMCovidContinents,
  getWDMCovidCountries,
  getWDMCovidWorld,
  getWDMPopulation,
};
