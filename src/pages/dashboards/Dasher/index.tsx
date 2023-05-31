// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import EcommerceProfit from 'src/views/dashboards/ecommerce/EcommerceProfit'
import EcommerceOrders from 'src/views/dashboards/ecommerce/EcommerceOrders'
import EcommerceExpenses from 'src/views/dashboards/ecommerce/EcommerceExpenses'
import EcommerceStatistics from 'src/views/dashboards/ecommerce/EcommerceStatistics'
import EcommerceInvoiceTable from 'src/views/dashboards/ecommerce/EcommerceInvoiceTable'
import EcommerceTransactions from 'src/views/dashboards/ecommerce/EcommerceTransactions'
import EcommerceRevenueReport from 'src/views/dashboards/ecommerce/EcommerceRevenueReport'
import EcommerceEarningReports from 'src/views/dashboards/ecommerce/EcommerceEarningReports'
import EcommerceGeneratedLeads from 'src/views/dashboards/ecommerce/EcommerceGeneratedLeads'
import EcommercePopularProducts from 'src/views/dashboards/ecommerce/EcommercePopularProducts'
import EcommerceCongratulationsJohn from 'src/views/dashboards/ecommerce/EcommerceCongratulationsJohn'
import BarChart from 'src/views/dashboards/Dasher/BarChart'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { useEffect, useState } from 'react'

function toplayici(l: string[][], d: number, t: number) {
  const bilinen = []
  const bilinenSay = []
  const bilinenSum = []
  l.forEach(row => {
    let plc = bilinen.indexOf(row[d])
    if (plc == -1) {
      plc = bilinen.push(row[d]) - 1
      bilinenSay[plc] = 1
      bilinenSum[plc] = parseFloat(row[t])
    } else {
      bilinenSay[plc] += 1
      bilinenSum[plc] += parseFloat(row[t])
    }
  })

  return [bilinen, bilinenSay, bilinenSum]
}

const EcommerceDashboard = () => {
  const [chSel, chSelSet] = useState()
  const [datas, datasSet] = useState()
  const [prepared, preparedSet] = useState()

  useEffect(() => {
    if (!chSel) return
    console.log('chSel', chSel)
    datasSet(false)
    fetch('/datas' + chSel + '.txt')
      .then(r => r.text())
      .then(r => datasSet(r.split('\n').map(k => k.split('\t'))))
  }, [chSel])
  useEffect(() => {
    if (!datas) return
    console.log('datas', datas)

    //CEKMECE	CC-0001	1111	868346797565	400258747002	Pantolon	1001-VAKKO	E	107-VK ERK.KONFEKSIYON	M	2023	48	Tekstil Ticari Ürünler	8032, Koyu Gri, 48	1
    //  0     1   2       3       4           5         6     7         8
    //Magza, raf, user,  barcode, stockCode, UrunTuru, Marka, Cinsiyet, kolleksiyon, size, yil, size2, beden, kat, biseykod, renk,  adet
    //9   10    11       12   13        14      15      16
  }, [datas])

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <EcommerceCongratulationsJohn selector={chSelSet} />
        </Grid>
        <Grid item xs={12} md={8}>
          <EcommerceStatistics datas={datas} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <BarChart
            key={chSel}
            data={datas}
            first={5}
            second={17}
            title='Products'
            height={600}
            limit={30}
            color='86e9f5'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <BarChart data={datas} first={15} second={17} title='Colors' height={600} limit={30} color='86b7f5' />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <BarChart data={datas} first={10} second={17} title='Markalar' height={600} limit={30} color='9cf586' />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6} md={3} lg={6}>
              <EcommerceExpenses />
            </Grid>
            <Grid item xs={6} md={3} lg={6}>
              <EcommerceProfit />
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              <EcommerceGeneratedLeads />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <EcommerceEarningReports />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <EcommercePopularProducts />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <EcommerceOrders />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <EcommerceTransactions />
        </Grid>
        <Grid item xs={12} lg={8}>
          <EcommerceInvoiceTable />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default EcommerceDashboard
