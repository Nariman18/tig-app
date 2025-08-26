import { NextResponse } from 'next/server'
import { Pool } from 'pg'

export async function GET() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URI })
  console.log('Using DB URI:', process.env.DATABASE_URI)

  try {
    const result = await pool.query('SELECT NOW()')
    return NextResponse.json({ success: true, time: result.rows[0].now })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message })
  }
}
