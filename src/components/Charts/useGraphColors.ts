import {useTheme} from '@material-ui/core/styles';

const useGraphColors = () => {
  const theme = useTheme();
  const GraphColors = [
    theme.palette.graphs.main,
    theme.palette.primary.main,
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.info.main,
    theme.palette.success.main,
  ];
  const GraphColorsKey = {
    deaths: theme.palette.error.main,
    totalDeaths: theme.palette.error.dark,
    recovered: theme.palette.graphs.main,
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
  };
  return {GraphColors, GraphColorsKey};
};

export default useGraphColors;
