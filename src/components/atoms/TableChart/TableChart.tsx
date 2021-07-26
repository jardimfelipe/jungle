import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { TableChartProps } from './TableChart.types';

const defaultOptions = {
  cutout: 20,
  layout: {
    padding: 0,
  },
  plugins: {
    tooltip: {
      enabled: false,
    },
  },
};

const TableChart: React.FC<TableChartProps> = (props) => {
  const { data, options, ...rest } = props;
  const [stateOptions, setOptions] = useState(defaultOptions);

  useEffect(() => {
    setOptions(
      (stateOptions) => (stateOptions = { ...stateOptions, ...options })
    );
  }, [options]);

  return (
    <Doughnut {...rest} options={stateOptions} type="Doughnut" data={data} />
  );
};

export default TableChart;
