// app/api/agency-base/filter-options/route.ts
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    // Getting all countries
    const countriesResult = await payload.find({
      collection: 'AgencyBase',
      limit: 1000,
      select: {
        country: true,
      } as const,
    })

    // Extracting distinct countries
    const countriesSet = new Set<string>()
    countriesResult.docs.forEach((doc: any) => {
      if (doc.country) {
        countriesSet.add(doc.country)
      }
    })

    // Getting social media icons from all agencies
    const socialResult = await payload.find({
      collection: 'AgencyBase',
      limit: 1000,
      select: {
        socialMediaIcons: true,
      } as const,
    })

    const socialPlatforms = new Set<string>()
    socialResult.docs.forEach((doc: any) => {
      if (doc.socialMediaIcons) {
        const icons = Array.isArray(doc.socialMediaIcons)
          ? doc.socialMediaIcons
          : [doc.socialMediaIcons]

        icons.forEach((icon: string) => {
          if (icon.includes('instagram')) socialPlatforms.add('Instagram')
          else if (icon.includes('youtube')) socialPlatforms.add('YouTube')
          else if (icon.includes('facebook')) socialPlatforms.add('Facebook')
          else if (icon.includes('tiktok')) socialPlatforms.add('TikTok')
          else if (icon.includes('twitch')) socialPlatforms.add('Twitch')
          else if (icon.includes('kick')) socialPlatforms.add('Kick')
          else if (icon.includes('trovo')) socialPlatforms.add('Trovo')
        })
      }
    })

    return NextResponse.json({
      countries: Array.from(countriesSet)
        .sort()
        .map((country) => ({ value: country, label: country })),
      socialMedias: Array.from(socialPlatforms)
        .sort()
        .map((platform) => ({
          value: platform.toLowerCase(),
          label: platform,
        })),
    })
  } catch (err) {
    console.error('Payload fetch error:', err)
    return NextResponse.json({ error: 'Failed to fetch filter options' }, { status: 500 })
  }
}
