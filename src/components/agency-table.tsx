'use client'
import Image from 'next/image'
import { FilteringPanel } from './filtering-panel'

import { useState } from 'react'
import React from 'react'
import { useFilterOptions } from '@/hooks/useFilterOptions'
import Pagination from './pagination'
import { SliderFilter } from './slider-filter'
import LoadingSpinner from './loading-spinner'
import { Agency, useAgencies } from '@/hooks/useFetchAgencies'
import { useDebounce } from '@/hooks/useDebounce'
import Link from 'next/link'

interface PaginationMeta {
  currentPage: number
  totalPages: number
  hasPrevPage: boolean
  hasNextPage: boolean
}

function AgencyTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [countryFilter, setCountryFilter] = useState('')
  const [socialMediaFilter, setSocialMediaFilter] = useState('')
  const [minFollowers, setMinFollowers] = useState<number | undefined>()
  const [maxFollowers, setMaxFollowers] = useState<number | undefined>()

  // Data debouncing
  const debouncedCountryFilter = useDebounce(countryFilter, 300)
  const debouncedSocialMediaFilter = useDebounce(socialMediaFilter, 300)
  const debouncedMinFollowers = useDebounce(minFollowers, 300)
  const debouncedMaxFollowers = useDebounce(maxFollowers, 300)

  // Fetching all filtering data
  const { data: filterData } = useFilterOptions()

  const countryOptions = filterData?.countries || []
  const socialMediaOptions = filterData?.socialMedias || []

  // Fetching only agencies data using TanStack Query hook
  const {
    data: agencyData,
    isLoading,
    isError,
  } = useAgencies({
    page: currentPage,
    limit: 20,
    countryFilter: debouncedCountryFilter || undefined,
    socialMediaFilter: debouncedSocialMediaFilter || undefined,
    minFollowers: debouncedMinFollowers,
    maxFollowers: debouncedMaxFollowers,
  })

  const agencies = agencyData?.agencies || []
  const pagination: PaginationMeta = agencyData?.pagination || {
    currentPage: 1,
    totalPages: 1,
    hasPrevPage: false,
    hasNextPage: false,
  }

  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1)
    if (filterType === 'country') {
      setCountryFilter(value)
    } else if (filterType === 'socialMedia') {
      setSocialMediaFilter(value)
    }
  }

  const handleFollowerFilterChange = (min: number, max: number) => {
    setCurrentPage(1)
    setMinFollowers(min)
    setMaxFollowers(max)
  }

  const handleClearFilters = () => {
    setCountryFilter('')
    setMinFollowers(undefined)
    setMaxFollowers(undefined)
    setSocialMediaFilter('')
    setCurrentPage(1)
  }

  const hasActiveFilters =
    countryFilter || socialMediaFilter || minFollowers !== undefined || maxFollowers !== undefined
  const noResultsWithFilters = hasActiveFilters && agencies.length === 0 && !isLoading

  const handlePageChange = (newNumber: number) => {
    setCurrentPage(newNumber)
  }

  // Format follower count for display
  const formatFollowerCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  if (isLoading)
    return (
      <div className="py-20">
        <LoadingSpinner />
      </div>
    )
  if (isError)
    return (
      <div className="text-red-500 text-[20px] flex items-center justify-center py-10">
        Error loading data
      </div>
    )

  return (
    <div className="max-w-full overflow-x-auto md:px-16 px-8 py-20">
      <div className="inline-block min-w-full">
        <div className="border rounded-lg pt-5 border-[#00bbf0]">
          <div className="px-4 md:px-8 mb-4">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              {/* Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                {/* Country Filter */}
                <FilteringPanel
                  onFilterChange={handleFilterChange}
                  filterType="country"
                  currentFilter={countryFilter}
                  options={countryOptions}
                />

                {/* Social Media Filter */}
                <FilteringPanel
                  onFilterChange={handleFilterChange}
                  filterType="socialMedia"
                  currentFilter={socialMediaFilter}
                  options={socialMediaOptions}
                />

                <SliderFilter
                  onFilterChange={handleFollowerFilterChange}
                  currentMin={minFollowers}
                  currentMax={maxFollowers}
                  className=""
                />
              </div>
            </div>
          </div>

          {/* Table Structure */}
          <div className="mt-10 flow-root">
            <div className="overflow-x-auto">
              <div className="min-w-[1600px] xl:min-w-0">
                <div className="inline-block min-w-full sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-600 ">
                    <thead>
                      <tr className="grid grid-cols-6 gap-x-10 text-white text-center text-xl font-dmSerif font-thin">
                        <th scope="col" className="py-3.5">
                          #
                        </th>
                        <th scope="col" className="py-3.5">
                          Nickname
                        </th>
                        <th scope="col" className="py-3.5">
                          Followers
                        </th>
                        <th scope="col" className="py-3.5">
                          Country
                        </th>
                        <th scope="col" className="py-3.5">
                          Socials
                        </th>
                        <th scope="col" className="py-3.5">
                          Contact
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-600">
                      {agencies.map((agency: Agency) => (
                        <tr key={agency.id} className="grid grid-cols-6 gap-x-10 text-white">
                          <td className="relative pt-5 pb-5 space-x-5 flex items-center justify-center">
                            <h1 className="whitespace-nowrap pt-5 pb-5 text-[17px] md:text-[19px] font-quicksand font-[500]">
                              {agency.displayNumber}
                            </h1>
                            <div className="relative w-16 h-16 min-w-[64px] min-h-[64px]">
                              {agency.image ? (
                                <Image
                                  src={agency.image}
                                  alt={agency.imageAlt || 'avatar'}
                                  fill
                                  className="object-cover rounded-full"
                                  priority
                                />
                              ) : (
                                <div className="w-full h-full rounded bg-gray-200 flex items-center justify-center">
                                  <span className="text-xs text-gray-500">No image</span>
                                </div>
                              )}
                            </div>
                          </td>

                          <td className="whitespace-nowrap pt-5 pb-5 text-[17px] flex items-center justify-center font-quicksand font-[600]">
                            {agency.nickname}
                          </td>
                          <td className="whitespace-nowrap pt-5 pb-5 text-[17px] flex items-center justify-center font-quicksand font-[600]">
                            {formatFollowerCount(agency.followers) || agency.followers}
                          </td>
                          <td className="whitespace-nowrap flex space-x-2 items-center justify-center pt-5 pb-5 text-[17px] font-quicksand font-[600]">
                            {agency.countryFlags && (
                              <div className="relative w-8 h-8 min-w-[32px] min-h-[32px]">
                                <Image
                                  src={agency.countryFlags}
                                  alt={`${agency.country} flag`}
                                  fill
                                  className="object-contain"
                                  priority
                                />
                              </div>
                            )}
                            <h1>{agency.country}</h1>
                          </td>
                          <td className="whitespace-nowrap pt-5 pb-5 text-lg font-quicksand font-[600]">
                            <div className="relative flex items-center justify-center w-full h-full">
                              {agency.socialMediaIcons && agency.socialMediaIcons.length > 0 ? (
                                agency.socialMediaIcons.map((icon: string, index: number) => {
                                  // Determine background color based on platform
                                  const getBackgroundColor = (iconPath: string) => {
                                    if (iconPath.includes('instagram'))
                                      return 'bg-[linear-gradient(0deg,#ff5b1c,#6416d7)]'
                                    if (iconPath.includes('youtube')) return 'bg-[#f4473a]'
                                    if (iconPath.includes('facebook')) return 'bg-[#039be5]'
                                    if (iconPath.includes('tiktok')) return 'bg-[#222222]'
                                    if (iconPath.includes('twitch')) return 'bg-[#8e24aa]'
                                    if (iconPath.includes('kick')) return 'bg-[#05ce78]'
                                    if (iconPath.includes('trovo'))
                                      return 'bg-[linear-gradient(0deg,#73c6ff,#c823ff)]'

                                    return 'bg-black'
                                  }

                                  return (
                                    <div
                                      key={index}
                                      className={`relative w-10 space-x-5 h-10 p-1 ${getBackgroundColor(icon)}`}
                                    >
                                      <div className="relative w-full h-full">
                                        <Image
                                          src={icon || ''}
                                          alt={`Social media icon ${index + 1}`}
                                          fill
                                          className="object-contain"
                                          loading="lazy"
                                          onError={(e) => {
                                            e.currentTarget.style.display = 'none'
                                          }}
                                        />
                                      </div>
                                    </div>
                                  )
                                })
                              ) : (
                                <div className="w-fit h-16 relative inline-block rounded bg-gray-200 pt-4">
                                  <span className="text-xs text-gray-500 p-2">No Socials</span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="whitespace-nowrap flex items-center justify-center pt-5 pb-5 text-base">
                            <Link
                              href="https://t.me/TrendInfluenceGroup"
                              className="rounded-lg p-3 text-sm text-white font-quicksand font-[600] button-gradient-bg"
                            >
                              Contact Us
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Pagination Controls */}
                  <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    hasPrevPage={pagination.hasPrevPage}
                    hasNextPage={pagination.hasNextPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Simple frontend notification */}
          {noResultsWithFilters && (
            <div className="mx-8 mb-4 p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
              <div className="flex items-center">
                <span className="text-yellow-700 text-sm">
                  ⚠️ No agencies found matching your current filters.
                </span>
                <button
                  onClick={handleClearFilters}
                  className="ml-4 px-3 py-1 bg-yellow-200 text-yellow-800 text-sm rounded hover:bg-yellow-300"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AgencyTable
