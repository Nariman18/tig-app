// hooks/useFetchAgencies.ts
'use client'

import { useState, useEffect } from 'react'

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

interface PaginationInfo {
  totalPages: number
  totalDocs: number
  currentPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
  noResultsWithFilters?: boolean
  appliedFilters?: {
    countryFilter?: string
    socialMediaFilter?: string
    minFollowers?: number
    maxFollowers?: number
  }
}

interface UseFetchAgenciesProps {
  page?: number
  limit?: number
  countryFilter?: string
  socialMediaFilter?: string
  minFollowers?: number
  maxFollowers?: number
  initialData?: {
    docs: Agency[]
    totalPages: number
    totalDocs: number
    currentPage: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export function useFetchAgencies({
  page = 1,
  limit = 50,
  countryFilter,
  socialMediaFilter,
  minFollowers,
  maxFollowers,
  initialData,
}: UseFetchAgenciesProps = {}) {
  const [agencies, setAgencies] = useState<Agency[]>(initialData?.docs || [])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<PaginationInfo>({
    totalPages: 1,
    totalDocs: 0,
    currentPage: 1,
    hasNextPage: false,
    hasPrevPage: false,
    noResultsWithFilters: false,
    appliedFilters: {},
  })

  useEffect(() => {
    // Only fetching if we have filters or pagination changes, and no initial data
    const shouldFetch =
      countryFilter ||
      socialMediaFilter ||
      minFollowers !== undefined ||
      maxFollowers !== undefined ||
      page !== 1 ||
      !initialData

    if (!shouldFetch) return
    const fetchData = async () => {
      try {
        setIsLoading(true)

        const params = new URLSearchParams()
        params.append('page', page.toString())
        params.append('limit', limit.toString())
        if (countryFilter) params.append('country', countryFilter)
        if (socialMediaFilter) params.append('socialMedia', socialMediaFilter)
        if (minFollowers !== undefined) params.append('minFollowers', minFollowers.toString())
        if (maxFollowers !== undefined) params.append('maxFollowers', maxFollowers.toString())

        const isDevelopment = process.env.NODE_ENV === 'development'

        const apiUrl = isDevelopment
          ? `/api/agency-base?${params}`
          : `${process.env.NEXT_PUBLIC_SERVER_URL}/api/agency-base?${params}`
        const response = await fetch(apiUrl)

        if (!response.ok) {
          throw new Error('Failed to fetch agencies')
        }

        const data = await response.json()
        setAgencies(data.docs || [])
        setPagination({
          totalPages: data.totalPages,
          totalDocs: data.totalDocs,
          currentPage: data.currentPage,
          hasNextPage: data.hasNextPage,
          hasPrevPage: data.hasPrevPage,
          noResultsWithFilters: data.noResultsWithFilters,
          appliedFilters: data.appliedFilters,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [page, limit, countryFilter, socialMediaFilter, minFollowers, maxFollowers, initialData])

  return {
    agencies,
    isLoading,
    error,
    pagination,
  }
}
