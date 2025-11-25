"use client"

import { useCallback, useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { useAppSelector } from "@/hooks/use-app-selector"
import { setSearchQuery } from "@/store/slices/shortsSlice"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  value?: string
  onChange?: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const dispatch = useAppDispatch()
  const searchQuery = useAppSelector((state) => state.shorts.searchQuery)
  const [inputValue, setInputValue] = useState<string>(value ?? searchQuery)

  useEffect(() => {
    // keep local input in sync when value prop changes
    if (typeof value === "string") setInputValue(value)
  }, [value])

  const handleSearch = useCallback(
    (val: string) => {
      setInputValue(val)
      if (onChange) {
        onChange(val)
      } else {
        // fallback to redux behavior for older usages
        dispatch(setSearchQuery(val))
      }
    },
    [dispatch, onChange],
  )

  const handleClear = () => {
    setInputValue("")
    if (onChange) onChange("")
    else dispatch(setSearchQuery(""))
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
