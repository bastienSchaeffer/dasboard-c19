import React, {useState, useEffect} from 'react';
import {Grid} from '@material-ui/core';
import {CardToday} from './Card';
import {Continent} from '../../types';
import {HeaderSection} from '../Header';

const Global = () => {
  const [world, setWorld] = React.useState<Continent>();
  const [healthRedis, setHealthRedis] = useState({date: ''});

  useEffect(() => {
    fetch('/health')
      .then((response) => response.json())
      .then((response) => setHealthRedis(response));
  }, []);

  useEffect(() => {
    fetch('/world')
      .then((response) => response.json())
      .then((response) => setWorld(response));
  }, []);

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <HeaderSection
            title={`Global`}
            caption={`Updated at: ${healthRedis.date}`}
          />
        </Grid>
      </Grid>

      <Grid container spacing={6}>
        <Grid item xs={12}>
          {world && <CardToday continent={world} />}
        </Grid>
      </Grid>
    </>
  );
};

export default Global;
