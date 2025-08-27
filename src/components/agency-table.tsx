'use client'
import Image from 'next/image'
import { FilteringPanel } from './filtering-panel'
import { Agency, useFetchAgencies } from '@/hooks/useFetchAgencies'
import { useState } from 'react'
import React from 'react'
import { useFilterOptions } from '@/hooks/useFilterOptions'
import Pagination from './pagination'
import { SliderFilter } from './slider-filter'

function AgencyTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [countryFilter, setCountryFilter] = useState('')
  const [socialMediaFilter, setSocialMediaFilter] = useState('')
  const [minFollowers, setMinFollowers] = useState<number | undefined>()
  const [maxFollowers, setMaxFollowers] = useState<number | undefined>()

  // Fetching all filtering data
  const { countries: countryOptions, socialMedias: socialMediaOptions } = useFilterOptions()

  // Fetching only agencies data
  const { agencies, isLoading, error, pagination } = useFetchAgencies({
    page: currentPage,
    limit: 50,
    countryFilter: countryFilter || undefined,
    socialMediaFilter: socialMediaFilter || undefined,
    minFollowers,
    maxFollowers,
  })

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

  if (isLoading) return <div className="text-center py-10">Loading agencies...</div>
  if (error)
    return (
      <div className="text-red-500 text-[20px] flex items-center justify-center py-10">
        Error loading data
      </div>
    )

  return (
    <div className="mt-10 max-w-full overflow-x-auto pt-10 md:pl-16 md:pr-16 pl-8 pr-8 pb-10">
      <div className="inline-block min-w-full">
        <div className="border border-black rounded-lg pt-5  dark:border-[#00bbf0]">
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
                  <table className="min-w-full divide-y divide-gray-600 dark:divide-gray-600">
                    <thead>
                      <tr className="grid grid-cols-7 gap-x-10">
                        <th
                          scope="col"
                          className="py-3.5 text-center text-xl font-dmSerif font-thin"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 text-center text-xl font-dmSerif font-thin"
                        >
                          Full Name
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 text-center text-xl font-dmSerif font-thin"
                        >
                          Nickname
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 text-center text-xl font-dmSerif font-thin"
                        >
                          Followers
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 text-center text-xl font-dmSerif font-thin"
                        >
                          Country
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 text-center text-xl font-dmSerif font-thin"
                        >
                          Socials
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 text-center text-xl font-dmSerif font-thin"
                        >
                          Contact
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-600 dark:divide-gray-700">
                      {agencies.map((agency) => (
                        <tr key={agency.id} className="grid grid-cols-7 gap-x-10">
                          <td className="whitespace-nowrap pt-5 pb-5 flex items-center justify-center text-[17px] font-quicksand font-[500]">
                            {agency.displayNumber}
                          </td>
                          <td className="relative pt-5 pb-5 space-x-3 flex items-center">
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
                            <p className="text-[17px] flex items-center font-quicksand font-[600]">
                              {agency.fullname}
                            </p>
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
                                agency.socialMediaIcons.map((icon, index) => {
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
                                          priority
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
                            <button className="rounded-lg p-3 text-sm text-white font-quicksand font-[600] button-gradient-bg">
                              Contact With Us
                            </button>
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
