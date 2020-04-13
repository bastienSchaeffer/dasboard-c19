import React from 'react';
import {
  PieChart as PieChartRecharts,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import useGraphColors from './useGraphColors';
import {Continent} from '../../types';

type PieChartProps = {
  dataSet: Continent[];
};

const PieChart: React.FC<PieChartProps> = ({dataSet}) => {
  const {GraphColors} = useGraphColors();

  return (
    <ResponsiveContainer width='100%' height={360} debounce={0}>
      <PieChartRecharts margin={{top: 0, right: 0, left: 0, bottom: 0}}>
        <Pie
          data={dataSet}
          cx={'50%'}
          cy={180}
          innerRadius='60%'
          outerRadius='90%'
          fill='#8884d8'
          paddingAngle={1}
          dataKey='totalCases'
        >
          {dataSet.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={GraphColors[index]} />
          ))}
        </Pie>
      </PieChartRecharts>
    </ResponsiveContainer>
  );
};
export default PieChart;
