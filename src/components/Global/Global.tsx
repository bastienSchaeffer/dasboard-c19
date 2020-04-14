import React from 'react';
import {Grid} from '@material-ui/core';
import {CardToday} from './Card';
import {Continent} from '../../types';
import {HeaderSection} from '../Header';

type GlobalProps = {
  health: {
    date: string;
  };
  world: Continent;
};
const Global: React.FC<GlobalProps> = ({health, world}) => {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <HeaderSection
            title={`Global`}
            caption={`Updated at: ${health.date}`}
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
