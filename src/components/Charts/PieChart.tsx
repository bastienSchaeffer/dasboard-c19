import React from 'react';
import {
  PieChart as PieChartRecharts,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {Continent} from '../../types';

type PieChartProps = {
  dataSet: Continent[];
  colors: string[];
};

const PieChart: React.FC<PieChartProps> = ({dataSet, colors}) => {
  return (
    <ResponsiveContainer width='100%' height={360} debounce={0}>
      <PieChartRecharts margin={{top: 0, right: 0, left: 0, bottom: 0}}>
        <Legend
          height={40}
          layout='horizontal'
          align='center'
          verticalAlign='bottom'
        />
        <Pie
          startAngle={330}
          endAngle={40}
          data={dataSet}
          cx={'50%'}
          cy={160}
          innerRadius='60%'
          outerRadius='90%'
          fill='#8884d8'
          paddingAngle={1}
          dataKey='totalCases'
        >
          {dataSet.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
      </PieChartRecharts>
    </ResponsiveContainer>
  );
};
export default PieChart;
