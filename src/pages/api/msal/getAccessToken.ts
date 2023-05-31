import { NextRequest, NextResponse } from 'next/server'
import msal from 'src/@core/utils/msal'

export default async function (req: NextRequest, res: NextResponse) {
  const tokenInfo = await msal.getAccessToken()
  console.log('token geliy', tokenInfo)
  res.status(200).json(tokenInfo)
}
