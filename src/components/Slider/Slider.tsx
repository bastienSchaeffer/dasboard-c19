import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '90%',
    margin: '0 auto',
  },
  customTooltip: {
    fontSize: '1em',
    backgroundColor: theme.palette.primary.main,
    zIndex: 1,
  },
  customArrow: {
    color: theme.palette.primary.main,
  },
}));

function valuetext(value: number) {
  return `day ${value}`;
}

interface Props {
  children: React.ReactElement;
  open: boolean;
  value: number;
}

function ValueLabelComponent(props: Props) {
  const {children, open, value} = props;
  const classes = useStyles();
  return (
    <Tooltip
      open={open}
      enterTouchDelay={0}
      placement='top'
      title={value}
      arrow
      classes={{
        tooltip: classes.customTooltip,
        arrow: classes.customArrow,
      }}
    >
      {children}
    </Tooltip>
  );
}

export default function DiscreteSlider({steps, setDaysSelected}: any) {
  const classes = useStyles();

  const handleChangeAuto = (_event: any, newValue: any) => {
    setDaysSelected(newValue as number[]);
  };

  return (
    <div className={classes.root}>
      <Slider
        defaultValue={[20, 37]}
        onChangeCommitted={handleChangeAuto}
        getAriaValueText={valuetext}
        valueLabelFormat={valuetext}
        aria-labelledby='discrete-slider'
        ValueLabelComponent={ValueLabelComponent}
        valueLabelDisplay='on'
        step={1}
        marks
        min={1}
        max={steps}
      />
    </div>
  );
}
