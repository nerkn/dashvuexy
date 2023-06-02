// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const disableMenus = true;

const navigation = (): HorizontalNavItemsType => {
  return [
    {
      icon: 'tabler:smart-home',
      title: 'Main Dashboard',
      children:  [
        { 
          icon: 'tabler:device-analytics',
          title: 'Dasher',
          path: '/dashboards/Dasher'
        }, 
        {
          icon: 'tabler:layout-grid',
          title: 'PowerBi',
          path: '/dashboards/PowerBi'
        }, 
      ]
    },
    {
      icon: 'tabler:layout-grid-add',
      title: 'Orders',
      children:  [   
            {
              title: 'List',
              path: '/apps/invoice/list'
            },
            {
              title: 'Preview',
              path: '/apps/invoice/preview'
            },
            {
              title: 'Edit',
              path: '/apps/invoice/edit'
            },
            {
              title: 'Add',
              path: '/apps/invoice/add'
            } 
      ]
    },
    {
      icon: 'tabler:color-swatch',
      title: 'B2b Analytics',
      children:  [
        {
          title: 'Typography',
          icon: 'tabler:typography',
          path: '/ui/typography'
        },
        {
          title: 'Icons',
          path: '/ui/icons',
          icon: 'tabler:brand-tabler'
        },
        {
          title: 'Cards',
          icon: 'tabler:id', 
        }, 
      ]
    },
    {
      icon: 'tabler:calender',
      title: 'Calender',
      children:  [
        {
          title: 'General View',
          icon: 'tabler:calendar',
          path: '/apps/calendar/'
        },
        {
          title: 'Plans', 
          path: '/charts/recharts',
          icon: 'tabler:chart-line'
        },   
      ]
    },
    {
      title: 'Help Desk',
      icon: 'tabler:checkbox',
      children:  [  
        {
          title: 'Form Validation',
          path: '/forms/form-validation',
          icon: 'tabler:checkbox'
        },
        {
          title: 'Form Wizard',
          path: '/forms/form-wizard',
          icon: 'tabler:text-wrap-disabled'
        }, 
      ]
    }, 
  ]
}

export default navigation
