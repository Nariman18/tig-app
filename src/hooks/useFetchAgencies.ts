'use client'
import { useQuery } from '@tanstack/react-query'

export interface Agency {
  id: string
  displayNumber: number
  displayId: number
  fullname: string
  nickname: string
  followers: number
  country: string
  countryFlags: string
  socialMediaIcons: string[]
  image: string
  imageAlt: string
  createdAt: string
  updatedAt: string
}

interface UseFetchAgenciesProps {
  page?: number
  limit?: number
  countryFilter?: string
  socialMediaFilter?: string
  minFollowers?: number
  maxFollowers?: number
}

export const useAgencies = ({
  page = 1,
  limit = 50,
  countryFilter,
  socialMediaFilter,
  minFollowers,
  maxFollowers,
}: UseFetchAgenciesProps) => {
  const queryKey = [
    'agencies',
    { page, limit, countryFilter, socialMediaFilter, minFollowers, maxFollowers },
  ]

  return useQuery({
    queryKey,
    queryFn: async () => {
      const params = new URLSearchParams()
      params.append('page', page.toString())
      params.append('limit', limit.toString())
      if (countryFilter) params.append('country', countryFilter)
      if (socialMediaFilter) params.append('socialMedia', socialMediaFilter)
      if (minFollowers !== undefined) params.append('minFollowers', minFollowers.toString())
      if (maxFollowers !== undefined) params.append('maxFollowers', maxFollowers.toString())

      const isDev = process.env.NODE_ENV === 'development'
      const apiUrl = isDev
        ? `/api/agency-base?${params}`
        : `${process.env.NEXT_PUBLIC_SERVER_URL}/api/agency-base?${params}`

      const response = await fetch(apiUrl)
      if (!response.ok) throw new Error('Failed to fetch agencies')

      return response.json()
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })
}
