import React from 'react';
import {Typography} from '@material-ui/core';

type HeaderSectionProps = {
  title: string;
  caption?: string;
};

const HeaderSection: React.FC<HeaderSectionProps> = ({title, caption}) => {
  const style = {
    background: 'linear-gradient(45deg, #F75108 30%, #FF008C 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    marginTop: '100px',
    padding: '4px 8px',
    fontWeight: 600,
    boxShadow: '0 3px 5px 2px rgba(247, 81, 8, .3)',
  };

  return (
    <>
      <Typography variant='h1' color='inherit' data-testid='title'>
        {title}
      </Typography>
      {caption && (
        <Typography
          variant='caption'
          color='inherit'
          style={style}
          data-testid='caption'
        >
          {caption}
        </Typography>
      )}
    </>
  );
};

export default HeaderSection;
