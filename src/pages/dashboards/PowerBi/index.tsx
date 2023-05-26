// ** MUI Import
//import Grid from '@mui/material/Grid'
/*
import { PowerBIEmbed } from 'powerbi-client-react'
*/
// ** Demo Component Imports

// ** Custom Component Import
/*
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import CardStatsWithAreaChart from 'src/@core/components/card-statistics/card-stats-with-area-chart'
*/

const PowerBiDashboard = () => {
  return (
    <iframe
      title='say'
      src='https://app.powerbi.com/reportEmbed?reportId=31b3bfaa-0041-4133-8f09-5a42406ed0a2&autoAuth=true&embeddedDemo=true'
      frameBorder='0'
      allowFullScreen={true}
      style={{
        width: '100%',
        height: '90vh'
      }}
    ></iframe>
  )
}

export default PowerBiDashboard
