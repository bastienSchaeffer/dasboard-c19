import React from 'react';
// import {Card, CardHeader, Divider} from '@material-ui/core';
import {useTheme} from '@material-ui/core/styles';
import {
  PieChart as PieChartRecharts,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

type LineChartProps = {
  // dataSet: any;
  // countryCode: string;
};

const PieChart: React.FC<LineChartProps> = () => {
  const theme = useTheme();
  const COLORS = [
    theme.palette.graphs.main,
    theme.palette.primary.main,
    theme.palette.info.main,
    theme.palette.error.main,
    theme.palette.warning.main,
    // theme.palette.graphs.main,
    // theme.palette.warning.main,
    theme.palette.success.main,
  ];

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   setData(dataSet[countryCode]);
  // }, [dataSet, countryCode]);

  const data = [
    {name: 'Group A', value: 570966},
    {name: 'Group B', value: 864080},
    {name: 'Group E', value: 7730},
    {name: 'Group C', value: 291458},
    {name: 'Group D', value: 48465},
    {name: 'Group F', value: 14384},
  ];

  return (
    // <Card>
    //   <CardHeader title='Evolution' />
    //   <Divider />
    <ResponsiveContainer width='100%' height={360} debounce={0}>
      {data && data.length ? (
        <PieChartRecharts
          margin={{top: 0, right: 0, left: 0, bottom: 0}}
          // width={800}
          // height={400}
          // onMouseEnter={this.onPieEnter}
        >
          <Pie
            data={data}
            cx={'50%'}
            cy={180}
            innerRadius='60%'
            outerRadius='90%'
            fill='#8884d8'
            paddingAngle={1}
            dataKey='value'
          >
            {data.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChartRecharts>
      ) : (
        <p>loading</p>
      )}
    </ResponsiveContainer>
    // </Card>
  );
};
export default PieChart;
