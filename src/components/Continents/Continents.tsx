import React, {useState, useEffect} from 'react';
import {Grid} from '@material-ui/core';
import {Card} from './Card';
import {PieChart} from '../Charts';
import {Continent} from '../../types';
import {HeaderSection} from '../Header';

const Continents = () => {
  const [continents, setContinents] = useState<Continent[]>([]);
  const colorsContinent = [
    '#46CBF9',
    '#39A7D3',
    '#2B83AD',
    '#1E6086',
    '#103C60',
    '#03183A',
  ];

  useEffect(() => {
    fetch('/continents')
      .then((response) => response.json())
      .then((response) => setContinents(response));
  }, []);

  return (
    <Grid container spacing={6} alignItems='center'>
      <Grid item xs={12}>
        <HeaderSection
          title={`Continents`}
          caption={`Filter data in array, select and check graphs`}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <PieChart dataSet={continents} colors={colorsContinent} />
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid container justify='space-between' spacing={2}>
          {continents.map((item, index) => (
            <Grid item xs={12} md={6} key={item.name}>
              <Card continent={item} color={colorsContinent[index]} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Continents;