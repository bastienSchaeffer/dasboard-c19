import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: '90%',
    margin: '0 auto',
  },
});

function valuetext(value: number) {
  return `${value}/06`;
}

export default function DiscreteSlider({steps, setDaysSelected}: any) {
  const classes = useStyles();

  const handleChangeAuto = (_event: any, newValue: any) => {
    // setDaysSelected(newValue);
    setDaysSelected(newValue as number[]);
  };

  return (
    <div className={classes.root}>
      {/* <Typography id='discrete-slider' gutterBottom>
        Days selected: {steps}
      </Typography> */}
      <Slider
        defaultValue={[20, 37]}
        onChangeCommitted={handleChangeAuto}
        getAriaValueText={valuetext}
        valueLabelFormat={valuetext}
        aria-labelledby='discrete-slider'
        valueLabelDisplay='on'
        step={1}
        marks
        min={1}
        max={steps}
      />
    </div>
  );
}
