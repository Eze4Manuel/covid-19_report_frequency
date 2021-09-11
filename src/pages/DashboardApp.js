import React, { useEffect, useState } from 'react';
import { Box, Grid, Container, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import {
  TotalSampleTested,
  TotalActiveCases,
  TotalDischarge,
  TotalConfirmedCases,
  TotalDeaths,
  AppConversionRates,
  AppConversionAdmission,
  AppConversionDeaths,
  AppConversionDischarge,
} from '../components/_dashboard/app';

const axios = require('axios').default;
// ----------------------------------------------------------------------

export default function DashboardApp() {

  const [data, setData] = useState({})
  const [truth, setTruth] = useState(false)
  useEffect(() => {
    (async () => {
      // Make a request for a user with a given ID
      await axios.get('https://covidnigeria.herokuapp.com/api')
        .then(function (response) {
          // handle success
          setData(response.data.data)
          setTruth(true)
        })
        .catch(function (error) {
          // handle error
          console.log('error');
        })

    })()
  }, []);

  return (
    <>
      {truth ?
        <Page title="Dashboard | Minimal-UI">
          <Container maxWidth="xl">
            <Box sx={{ pb: 5 }}>
              <Typography variant="h4">Covid-19 Case Report</Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <TotalConfirmedCases data={data} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TotalSampleTested data={data} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TotalDischarge data={data} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TotalActiveCases data={data} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TotalDeaths data={data} />
              </Grid>

              <Grid item xs={12} md={6} lg={8}>
                <AppConversionRates data={data} />
              </Grid>
              <Grid item xs={12} md={6} lg={8}>
                <AppConversionAdmission data={data} />
              </Grid>
              <Grid item xs={12} md={6} lg={8}>
                <AppConversionDeaths data={data} />
              </Grid>
              <Grid item xs={12} md={6} lg={8}>
                <AppConversionDischarge data={data} />
              </Grid>


            </Grid>
          </Container>
        </Page>
        :
        <h4>Loading Data</h4>
      }
    </>
  );
}

