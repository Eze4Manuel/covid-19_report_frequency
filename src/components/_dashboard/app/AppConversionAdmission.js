import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@material-ui/core';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------


export default function AppConversionAdmission({data: data}) {

  const CHART_DATA = [{ data: data?.states.map(e => e.casesOnAdmission) }];


  const chartOptions = merge(BaseOptionChart(), {

    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 }
    },
    xaxis: {
      categories: data?.states.map(e => ( e.state ))
    }
  });

  return (
    <Card>
      <CardHeader title="Conversion Admission" subheader="(+43%) than last year" />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={564} />
      </Box>
    </Card>
  );
}
