import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(request: Request) {
  try {
    const payload = await getPayload({ config })

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const countryFilter = searchParams.get('country')
    const socialMediaFilter = searchParams.get('socialMedia')
    const minFollowers = searchParams.get('minFollowers')
    const maxFollowers = searchParams.get('maxFollowers')

    const query: any = {
      collection: 'AgencyBase',
      sort: 'createdAt',
      depth: 1,
      page,
      limit,
    }

    // Map filter values to actual database values
    const socialMediaValueMap: Record<string, string> = {
      instagram: '/socials/icons8-instagram.gif',
      facebook: '/socials/icons8-facebook.gif',
      youtube: '/socials/icons8-youtube.gif',
      twitch: '/socials/icons8-twitch.gif',
      tiktok: '/socials/icons8-tiktok.gif',
      kick: '/socials/kick.png',
      trovo: '/socials/icons8-trovo-logo.svg',
    }

    const whereConditions: any[] = []

    if (countryFilter) {
      whereConditions.push({ country: { equals: countryFilter } })
    }

    if (socialMediaFilter) {
      whereConditions.push({
        socialMediaIcons: {
          contains: socialMediaValueMap[socialMediaFilter] || socialMediaFilter,
        },
      })
    }

    // Add follower count filtering (now numeric)
    if (minFollowers || maxFollowers) {
      const followersCondition: any = {}

      if (minFollowers) {
        followersCondition.greater_than_equal = parseInt(minFollowers)
      }

      if (maxFollowers) {
        followersCondition.less_than_equal = parseInt(maxFollowers)
      }

      whereConditions.push({ followers: followersCondition })
    }

    if (whereConditions.length > 0) {
      query.where = { and: whereConditions }
    }

    const result = await payload.find(query)

    // Check if no results found with filters
    const hasFilters = countryFilter || socialMediaFilter || minFollowers || maxFollowers
    const noResultsWithFilters = hasFilters && result.totalDocs === 0

    const startNumber = (page - 1) * limit + 1

    const docs = result.docs.map((a: any, index: number) => {
      const avatar = a.avatar
      let imageUrl = ''
      let imageAlt = a?.fullname || 'avatar'

      if (avatar && typeof avatar === 'object') {
        imageUrl = avatar?.sizes?.avatar?.url || avatar?.url || ''
        imageAlt = avatar?.alt || imageAlt
      }

      // Handling socialMediaIcons - ensure it's always an array
      let socialMediaIcons: string[] = []
      if (a.socialMediaIcons) {
        socialMediaIcons = Array.isArray(a.socialMediaIcons)
          ? a.socialMediaIcons
          : [a.socialMediaIcons]
      }

      return {
        id: a.id,
        displayNumber: startNumber + index,
        displayId: a.displayId,
        fullname: a.fullname,
        nickname: a.nickname,
        followers: a.followers, // This is now a number
        country: a.country,
        countryFlags: a.countryFlags,
        socialMediaIcons: a.socialMediaIcons,
        image: imageUrl,
        imageAlt,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
      }
    })

    return NextResponse.json({
      docs,
      totalPages: result.totalPages,
      totalDocs: result.totalDocs,
      currentPage: page,
      hasNextPage: page < result.totalPages,
      hasPrevPage: page > 1,
      noResultsWithFilters: noResultsWithFilters,
      appliedFilters: {
        countryFilter,
        socialMediaFilter,
        minFollowers,
        maxFollowers,
      },
    })
  } catch (err) {
    console.error('Payload fetch error:', err)
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}
