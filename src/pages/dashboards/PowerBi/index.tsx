import { useEffect, useState } from 'react'
import PowerBiComponent from 'src/pages/components/PowerBiComponent'

type embedConfig = {
  reportid: string
  embedUrl: string
  accessToken: string
}

const PowerBiDashboard = () => {
  const [token, tokenSet] = useState<embedConfig>()
  useEffect(() => {
    fetch('/api/msal/getAccessToken')
      .then(r => r.json())
      .then(r => {
        if (r.err) {
          console.log(r)
        } else {
          tokenSet(r)
        }
      })
  }, [])
  if (token) {
    return (
      <PowerBiComponent
        token={token}
        groupid='0a27dd2d-df3f-44ec-82af-9dfb2a3c1036'
        reportid='e8ecc8e1-3bf1-42a6-bfcd-67ced97bcd23'
      />
    )
  } else {
    return (
      <div>
        {' '}
        <h2>Loading</h2>
      </div>
    )
  }
}

export default PowerBiDashboard
