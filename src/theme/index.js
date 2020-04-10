import {createMuiTheme} from '@material-ui/core';

// import palette from './palette';
import palette from './palette_2';
import typography from './typography';
import overrides from './overrides';

const theme = createMuiTheme({
  palette,
  typography,
  overrides,
  zIndex: {
    appBar: 12000,
    drawer: 1100,
  },
});

export default theme;
