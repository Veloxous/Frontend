import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const account = searchParams.get('account')

    if (!account) {
      return NextResponse.json({ error: 'Account is required' }, { status: 400 })
    }

    const res = await fetch(`${BACKEND_URL}/auth/challenge?account=${account}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      const errorText = await res.text()
      return NextResponse.json({ error: `Backend error: ${errorText}` }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching challenge:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
