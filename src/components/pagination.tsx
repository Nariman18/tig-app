'use client'

interface PaginationProps {
  currentPage: number
  totalPages: number
  hasPrevPage: boolean
  hasNextPage: boolean
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  hasPrevPage,
  hasNextPage,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="relative w-full flex justify-center items-center p-6 gap-4 mt-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevPage}
        className="px-4 py-2 rounded-lg p-3 text-sm text-white font-quicksand font-[600] button-gradient-bg"
      >
        Previous
      </button>

      <span className="text-base font-quicksand font-[600]">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className="px-4 py-2 rounded-lg p-3 text-sm text-white font-quicksand font-[600] button-gradient-bg disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}
