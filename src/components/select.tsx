/* eslint-disable no-use-before-define */
import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {makeStyles} from '@material-ui/core/styles';

// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
function countryToFlag(isoCode: string) {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
    : isoCode;
}

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

interface CountryType {
  name: string;
  continent: string;
  population: number;
  percentage: number;
  totalCases: number;
  totalDeaths: number;
  countryCode: string;
}

export default function CountrySelect({
  setSelectedCountryCode,
  setSelectedCountry,
}: any) {
  const classes = useStyles();
  const [countries, setCountries] = useState<CountryType[]>([]);

  useEffect(() => {
    fetch('/countries')
      .then((response) => response.json())
      .then((response) => setCountries(response));
  }, []);

  const handleChangeAuto = (event: any, values: any) => {
    if (values) {
      setSelectedCountryCode(values.countryCode);
      setSelectedCountry(values.name);
    }
  };

  return (
    <>
      {countries.length && (
        <Autocomplete
          id='country-select-demo'
          // style={{width: 300}}
          options={countries as CountryType[]}
          classes={{
            option: classes.option,
          }}
          defaultValue={countries[0]}
          autoHighlight
          getOptionLabel={(option) => option.name}
          renderOption={(option) => (
            <React.Fragment>
              <span>{countryToFlag(option.countryCode)}</span>
              {option.name} ({option.countryCode})
            </React.Fragment>
          )}
          onChange={handleChangeAuto}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Choose a country'
              variant='outlined'
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
          )}
        />
      )}
    </>
  );
}
