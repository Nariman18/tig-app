'use client'

import { useState, useEffect } from 'react'

export interface FilterOption {
  value: string
  label: string
}

export interface FilterOptions {
  countries: FilterOption[]
  socialMedias: FilterOption[]
}

export function useFilterOptions() {
  const [options, setOptions] = useState<FilterOptions>({
    countries: [],
    socialMedias: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const isDevelopment = process.env.NODE_ENV === 'development'

        const apiUrl = isDevelopment
          ? `/api/agency-base/filter-options`
          : `${process.env.NEXT_PUBLIC_SERVER_URL}/api/agency-base/filter-options`
        const response = await fetch(apiUrl)

        if (!response.ok) {
          throw new Error('Failed to fetch filter options')
        }

        const data = await response.json()
        setOptions(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        console.error('Error fetching filter options:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOptions()
  }, [])

  return { ...options, isLoading, error }
}
