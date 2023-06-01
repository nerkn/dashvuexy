// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

interface DataType {
  icon: string
  stats: string
  title: string
  color: ThemeColor
}

const data: DataType[] = [
  {
    stats: '230k',
    title: 'Toplam Ürün',
    color: 'primary',
    icon: 'tabler:chart-pie-2'
  },
  {
    color: 'info',
    stats: '8.549k',
    title: 'Tekil Ürün',
    icon: 'tabler:users'
  },
  {
    color: 'error',
    stats: '1.423k',
    title: 'Raf',
    icon: 'tabler:shopping-cart'
  },
  {
    stats: '$9745',
    color: 'success',
    title: 'Lokasyon',
    icon: 'tabler:currency-dollar'
  }
]

const renderStats = () => {
  return data.map((sale: DataType, index: number) => (
    <Grid item xs={6} md={3} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <CustomAvatar skin='light' color={sale.color} sx={{ mr: 4, width: 42, height: 42 }}>
          <Icon icon={sale.icon} fontSize='1.5rem' />
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h5'>{sale.stats}</Typography>
          <Typography variant='body2'>{sale.title}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const EcommerceStatistics = ({ datas }) => {
  if (datas) {
    const urunSayisi = datas.length
    const rafSayisi = new Set(datas.map(d => d[1])).size
    const lokasyonSay = new Set(datas.map(d => d[0])).size
    const toplamUrun = datas.map(d => parseFloat(d[17]) || 0).reduce((d, t) => t + d, 0)
    data[0].stats = toplamUrun
    data[1].stats = urunSayisi
    data[2].stats = rafSayisi
    data[3].stats = lokasyonSay
  } else {
    data[0].stats = 'Loading'
    data[1].stats = 'Loading'
    data[2].stats = 'Loading'
    data[3].stats = 'Loading'
  }

  return (
    <Card>
      <CardHeader
        title='Statistics'
        sx={{ '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' } }}
        action={
          <Typography variant='body2' sx={{ color: 'text.disabled' }}>
            Updated 12 minutes ago
          </Typography>
        }
      />
      <CardContent
        sx={{ pt: theme => `${theme.spacing(7)} !important`, pb: theme => `${theme.spacing(7.5)} !important` }}
      >
        <Grid container spacing={6}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default EcommerceStatistics
