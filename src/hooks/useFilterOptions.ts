// hooks/useFilterOptions.ts
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
        const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'
        const response = await fetch(`${API_BASE}/api/agency-base/filter-options`)

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
