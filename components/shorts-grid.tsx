"use client"

import { useEffect, useRef, useState } from "react"
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
  const [allShorts, setAllShorts] = useState<Short[]>([])
  const [searchKey, setSearchKey] = useState(0) // Force re-query on search/tag change
  
  const { data, isLoading, error, isFetching } = useGetShortsQuery(
    { page, limit: 40, search: searchTerm, tag: selectedTag },
    { refetchOnMountOrArgChange: true }
  )

  const observerRef = useRef<HTMLDivElement | null>(null)

  // Reset when search/filter changes (happens BEFORE query runs)
  useEffect(() => {
    setPage(1)
    setAllShorts([])
    setSearchKey((prev) => prev + 1) // Force fresh query
  }, [searchTerm, selectedTag])

  // Append new shorts when data changes
  useEffect(() => {
    if (data?.data?.data) {
      if (page === 1) setAllShorts(data.data.data)
      else setAllShorts((prev) => [...prev, ...data.data.data])
    }
  }, [data?.data?.data, page])

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching && data?.data?.meta) {
          const totalPages = Math.ceil(data.data.meta.total / data.data.meta.limit)
          if (page < totalPages) setPage((prev) => prev + 1)
        }
      },
      { threshold: 1 }
    )

    if (observerRef.current) observer.observe(observerRef.current)

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current)
    }
  }, [observerRef, isFetching, data, page])

  const totalPages = data?.data?.meta ? Math.ceil(data.data.meta.total / data.data.meta.limit) : 0

  if (isLoading && page === 1) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">Failed to load shorts. Please try again.</p>
      </div>
    )
  }

  if (allShorts.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">No shorts found matching your filters</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allShorts.map((short) => (
          <ShortCard key={short.id} short={short} />
        ))}
      </div>

      {/* Observer element for infinite scroll */}
      <div ref={observerRef} className="h-1 w-full" />

      {/* Loader while fetching more */}
      {isFetching && (
        <div className="flex justify-center py-4">
          <Spinner className="h-6 w-6 text-primary" />
        </div>
      )}

      {/* Pagination numbers */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`px-3 py-1 rounded-md ${p === page ? "bg-primary text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
