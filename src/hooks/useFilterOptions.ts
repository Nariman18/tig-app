'use client'

import { useQuery } from '@tanstack/react-query'

export interface FilterOption {
  value: string
  label: string
}

export interface FilterOptions {
  countries: FilterOption[]
  socialMedias: FilterOption[]
}

export function useFilterOptions() {
  return useQuery<FilterOptions>({
    queryKey: ['filterOptions'],
    queryFn: async () => {
      const isDevelopment = process.env.NODE_ENV === 'development'
      const apiUrl = isDevelopment
        ? `/api/agency-base/filter-options`
        : `${process.env.NEXT_PUBLIC_SERVER_URL}/api/agency-base/filter-options`

      const res = await fetch(apiUrl)
      if (!res.ok) throw new Error('Failed to fetch filter options')
      return res.json()
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })
}
