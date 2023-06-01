// ** React Imports
import { ChangeEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { DataGridRowType } from 'src/@fake-db/types'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


interface StatusObj {
  [key: number]: {
    title: string
    color: ThemeColor
  }
}

// ** renders client column
const renderClient = (params: GridRenderCellParams) => {
  const { row } = params
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
  const color = states[stateNum]

  if (row.avatar.length) {
    return <CustomAvatar src={`/images/avatars/${row.avatar}`} sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={color as ThemeColor}
        sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}
      >
        {getInitials(row.full_name ? row.full_name : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const statusObj: StatusObj = {
  1: { title: 'current', color: 'primary' },
  2: { title: 'professional', color: 'success' },
  3: { title: 'rejected', color: 'error' },
  4: { title: 'resigned', color: 'warning' },
  5: { title: 'applied', color: 'info' }
}

const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

    //Magza, raf, user,  barcode, stockCode, UrunTuru, XX, xx, xx, xx, Marka, Cinsiyet, kolleksiyon, size, yil, size2, beden, kat, biseykod, renk,  adet
    //CEKMECE	CC-0001	1111	8683	30010866	Pantolon	8683	0,00	0,00	%8 KDV	1001-VAKKO	E	107-VK ERK.KONFEKSIYON	M	2023	48	Tekstil Mamul	 3	3302, Gri Melanj, 48
const columns: GridColDef[] = [
  {    headerName: 'Store',    field: '0',    flex: 0.275,  },
  {    headerName: 'Shelf',      field: '1',    flex: 0.2,    minWidth: 120,  },
  {    headerName: 'Barcode',  field: '3',    flex: 0.2,    minWidth: 110,  },
  {    headerName: 'Product',  field: '5',    flex: 0.125,    minWidth: 80,
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row[5]}
      </Typography>
    ),
  },
  {    headerName: 'Brand',    field: '10',    flex: 0.2,    minWidth: 140, },
  {    headerName: 'Gender',    field: '11',    flex: 0.2,    minWidth: 140, align:'center',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: params.row[7]=='M'?'text.primary':'text.secondary' }}>
        {params.row[11]}
      </Typography>
    ) },

  {    headerName: 'Miktar',    field: '17',    flex: 0.2,    minWidth: 140,
    type: 'number',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: params.row[17]>5?'text.primary':'text.secondary' }}>
        {params.row[17]}
      </Typography>
    )
  },

]

const DasherGrid = ({datas}) => {
  // ** States
  if(!datas)
    return <></>
  let data = datas.map((d,i)=>{d.id=i; return d})
  /*
   * .map(d=>({
    magaza:d[0],
    raf:d
  CEKMECE	CC-0001	1111	868346797565	400258747002	Pantolon	8683467975658	0,00	0,00	%8 KDV	1001-VAKKO	E	107-VK ERK.KONFEKSIYON	M	2023	48	Tekstil Ticari Ürünler	 5	8032, Koyu Gri, 48
*/
  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<DataGridRowType[]>([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 100 })

  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows = data.filter(row => {
      return Object.keys(row).some(field => {
        // @ts-ignore
        return searchRegex.test(row[field].toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }
  const handleChange = (searchValue: string) => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows = data.filter(row => {
      return Object.keys(row).some(field => {
        // @ts-ignore
        return searchRegex.test(row[field].toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }

  return (
    <Card>
      <CardHeader title='Report' />

      <FormControl sx={{ml:2}} >
      <InputLabel id="filterStoreL">Store</InputLabel>
      <Select
        labelId="filterStoreL"
        id="filterStore"
        label="Store"
        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event.target.value)}
      >
      {[...new Set(data.map(d=>d[0]))].map(d=><MenuItem value={d}>{d}</MenuItem>)}
      </Select>
      </FormControl >
      <FormControl >
      <InputLabel id="filterProductL">Product</InputLabel>
      <Select
        labelId="filterProductL"
        id="filterProduct"
        label="Product"
        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event.target.value)}
      >
      {[...new Set(data.map(d=>d[5]))].map(d=><MenuItem value={d}>{d}</MenuItem>)}
      </Select>
    </FormControl>

      <DataGrid
        autoHeight
        columns={columns}
        pageSizeOptions={[100, 250, 500]}
        paginationModel={paginationModel}
        //slots={{ toolbar: QuickSearchToolbar }}
        onPaginationModelChange={setPaginationModel}
        rows={filteredData.length ? filteredData : data}
        sx={{
          '& .MuiSvgIcon-root': {
            fontSize: '1rem'
          }
        }}
        slotProps={{
          baseButton: {
            size: 'medium',
            variant: 'outlined'
          },
          toolbar: {
            //value: searchText,
            clearSearch: () => handleSearch(''),
            onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
          }
        }}
      />
    </Card>
  )
}

export default DasherGrid
