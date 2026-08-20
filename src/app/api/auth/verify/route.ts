import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.transaction) {
      return NextResponse.json({ error: 'Signed transaction (XDR) is required' }, { status: 400 })
    }

    const res = await fetch(`${BACKEND_URL}/auth/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const errorText = await res.text()
      return NextResponse.json({ error: `Backend error: ${errorText}` }, { status: res.status })
    }

    const data = await res.json()
    const token = data.token || data.jwt

    if (!token) {
      return NextResponse.json({ error: 'No token returned from backend' }, { status: 500 })
    }

    // Set secure cookie
    const cookieStore = await cookies()
    cookieStore.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })

    // Return success without the raw token
    return NextResponse.json({ success: true, message: 'Authentication successful' })
  } catch (error) {
    console.error('Error verifying challenge:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
