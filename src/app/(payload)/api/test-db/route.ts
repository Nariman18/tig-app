// app/api/test-db/route.ts
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET() {
  try {
    console.log('Testing database connection...')
    const payload = await getPayload({ config })

    // Simple test query
    const result = await payload.find({
      collection: 'AgencyBase',
      limit: 1,
      depth: 0,
    })

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      count: result.totalDocs,
      sample: result.docs.length > 0 ? result.docs[0] : null,
    })
  } catch (error: any) {
    console.error('Database test error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}
