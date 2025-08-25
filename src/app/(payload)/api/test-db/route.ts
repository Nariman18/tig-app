// app/api/test-db/route.ts
import { NextResponse } from 'next/server'
import { Client } from 'pg'

export async function GET() {
  try {
    const client = new Client({
      connectionString: process.env.DATABASE_URI,
      ssl: { rejectUnauthorized: false },
    })

    await client.connect()
    const result = await client.query('SELECT NOW() as current_time')
    await client.end()

    return NextResponse.json({
      success: true,
      time: result.rows[0].current_time,
      message: 'Database connection successful',
    })
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Database connection failed',
        details: process.env.NODE_ENV === 'development' ? error : 'Check your database connection',
      },
      { status: 500 },
    )
  }
}
