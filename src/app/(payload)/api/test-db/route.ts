// app/api/test-db/route.ts
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    // Test a simple query
    const result = await payload.find({
      collection: 'AgencyBase',
      limit: 1,
    })

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      count: result.totalDocs,
    })
  } catch (error: any) {
    console.error('Database test error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        details: 'Check DATABASE_URI and SSL configuration',
      },
      { status: 500 },
    )
  }
}
