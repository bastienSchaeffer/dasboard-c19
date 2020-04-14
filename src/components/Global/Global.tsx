import React, {useState, useEffect} from 'react';
import {Grid} from '@material-ui/core';
import {CardToday} from './Card';
import {Continent} from '../../types';
import {HeaderSection} from '../Header';
import Loader from '../Loader';

type Health = {
  origin?: string;
  date: string;
};

const Global: React.FC = () => {
  const [world, setWorld] = React.useState<Continent>();
  const [healthRedis, setHealthRedis] = useState<Health>({date: ''});

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
          {world ? (
            <CardToday continent={world} />
          ) : (
            <Grid item xs={12}>
              <Loader />
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Global;
