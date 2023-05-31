import { NextRequest, NextResponse } from 'next/server'
import msal from 'src/@core/utils/msal'
import powerconfig from 'src/configs/powerconfig'

export default async function (req: NextRequest, res: NextResponse) {
  const fn = req.query.fn
  const token = await msal.getAccessToken()
  console.log('api/msal', { headers: { Authorization: `Bearer ${token.accessToken}` } }, token)
  switch (fn) {
    case 'GetDatasets':
      return res.status(200).json(
        await fetch('https://api.powerbi.com/v1.0/myorg/datasets', {
          headers: { Authorization: `Bearer ${token.accessToken}` }
        })
          .then(r => {
            console.log('returnig request', r.status, r.statusText)
            r.text()
          })
          .then(r => r)
      )
    case 'getAccessToken':
      res.status(200).json(token)
  }

  res.status(200).json({ name: 'John Doe' })
}
