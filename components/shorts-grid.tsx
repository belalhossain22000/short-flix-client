"use client"

import { useState } from "react"
import { useGetShortsQuery } from "@/store/api/shortsApi"
import { ShortCard } from "./short-card"
import { Spinner } from "@/components/ui/spinner"
import { Short } from "@/types/shorts"

interface ShortsGridProps {
  searchTerm?: string
  selectedTag?: string
}

export function ShortsGrid({ searchTerm = "", selectedTag = "" }: ShortsGridProps) {
  const [page, setPage] = useState(1)
  const { data, isLoading, error } = useGetShortsQuery({
    page,
    limit: 18,
    search: searchTerm,
    tag: selectedTag,
  },
    {
      refetchOnMountOrArgChange: true,
    }
  )


  const shorts = data?.data?.data || []


  if (isLoading) {
    return (
      <div className="col-span-full flex h-64 items-center justify-center">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="col-span-full flex h-64 items-center justify-center">
        <p className="text-muted-foreground">Failed to load shorts. Please try again.</p>
      </div>
    )
  }

  if (shorts?.length === 0) {
    return (
      <div className="col-span-full flex h-64 items-center justify-center">
        <p className="text-muted-foreground">No shorts found matching your filters</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {shorts?.map((short: Short) => (
          <ShortCard key={short.id} short={short} />
        ))}
      </div>

      {/* Pagination */}
      {data?.data?.meta && data?.data?.meta.total > data?.data.meta.limit && (
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-md bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
          >
            Previous
          </button>
          <span className="text-muted-foreground">Page {page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page * (data?.data?.meta?.limit || 20) >= (data?.data?.meta?.total || 0)}
            className="px-4 py-2 rounded-md bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
