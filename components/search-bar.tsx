"use client"

import { useCallback, useState } from "react"
import { Input } from "@/components/ui/input"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { useAppSelector } from "@/hooks/use-app-selector"
import { setSearchQuery } from "@/store/slices/shortsSlice"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SearchBar() {
  const dispatch = useAppDispatch()
  const searchQuery = useAppSelector((state) => state.shorts.searchQuery)
  const [inputValue, setInputValue] = useState(searchQuery)

  const handleSearch = useCallback(
    (value: string) => {
      setInputValue(value)
      dispatch(setSearchQuery(value))
    },
    [dispatch],
  )

  const handleClear = () => {
    setInputValue("")
    dispatch(setSearchQuery(""))
  }

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search shorts..."
        className="pl-9 pr-9"
        value={inputValue}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {inputValue && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
          onClick={handleClear}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
