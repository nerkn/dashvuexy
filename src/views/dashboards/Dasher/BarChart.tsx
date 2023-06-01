// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { toplayici } from 'src/@core/utils/data-transform'
import { Box, PaletteColor } from '@mui/material'

const BarChart = ({
  data,
  first,
  second,
  color,
  chartType = 'bar',
  title = '',
  height = 600,
  limit = 0
}: {
  data: string[][]
  first: number
  second: number
  color: PaletteColor
  chartType: string
  title: string
  height: number
  limit: number
}) => {
  // ** Hook
  const theme = useTheme()

  const preparedData = toplayici(data, first, second)
  console.log('preparedData', preparedData)
  let series = []
  preparedData[0].forEach((e, i) => {
    if (e) series.push({ x: e, y: preparedData[2][i] })
  })
  series.sort((a, b) => b.y - a.y)
  if (limit > 0) {
    series = series.slice(0, limit)
  }
  console.log('series ', series)
  console.log(
    'categories ',
    series.map(e => e.x)
  )

  const options: ApexOptions = {
    stroke: { lineCap: 'round' },
    colors: [hexToRGBA(color, 1)],
    plotOptions: {
      bar: {
        horizontal: true
      },
      radialBari: {
        endAngle: 90,
        startAngle: -90,
        hollow: { size: '64%' },
        track: {
          strokeWidth: '40%',
          background: hexToRGBA(theme.palette.customColors.trackBg, 1)
        },
        dataLabels: {
          name: { show: false },
          value: {
            fontWeight: 600,
            color: theme.palette.text.primary,
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.h4.fontSize as string
          }
        }
      }
    },
    xaxis: { categories: series.map(e => e.x) },
    grid: {
      padding: {
        bottom: 15
      }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        options: {
          chart: { height: 199 }
        }
      },
      {
        breakpoint: 430,
        options: {
          chart: { height: 150 }
        }
      }
    ]
  }

  return (
    <Card>
      <CardContent>
        <Typography variant='h5'>{title}</Typography>
        <Typography variant='body2' sx={{ color: 'text.disabled' }}>

        </Typography>

        {data ? (
          <ReactApexcharts type={chartType} height={height} series={[{ name: 'dd', data: series }]} options={options} />
        ) : (
          <Box />
        )}
        <Typography variant='body2' sx={{ textAlign: 'center', color: 'text.disabled' }}>
          $21k Expenses more than last month
        </Typography>
      </CardContent>
    </Card>
  )
}

export default BarChart
