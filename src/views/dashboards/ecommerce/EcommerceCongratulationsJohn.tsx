// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

const Illustration = styled('img')(({ theme }) => ({
  right: 20,
  bottom: 0,
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    right: 5,
    width: 110
  }
}))

const EcommerceCongratulationsJohn = ({ selector }) => {
  const theme = useTheme()

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h5' sx={{ mb: 0.5 }}>
          Congratulations John! 🎉
        </Typography>
        <Typography sx={{ mb: 2, color: 'text.secondary' }}>Best seller of the month</Typography>
        <FormControl>
          <InputLabel id='report-selection' sx={{ p: 1, bgcolor: theme.palette.background.paper }}>
            Report
          </InputLabel>
          <Select labelId='report-selection' onChange={e => selector(e.target.value)}>
            <MenuItem></MenuItem>
            <MenuItem value='1'>2023 - May Adana</MenuItem>
            <MenuItem value='2'>2023 - May Antalya</MenuItem>
            <MenuItem value='3'>2023 - May Bursa</MenuItem>
          </Select>
        </FormControl>
        <Illustration width={116} alt='congratulations john' src='/images/cards/congratulations-john.png' />
      </CardContent>
    </Card>
  )
}

export default EcommerceCongratulationsJohn
