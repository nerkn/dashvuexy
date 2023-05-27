import { NextRequest, NextResponse } from 'next/server'

export default function msal(req: NextRequest, res: NextResponse) {
  res.status(200).json({ name: 'John Doe' })
}
