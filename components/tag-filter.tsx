"use client"
import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { useAppSelector } from "@/hooks/use-app-selector"
import { toggleTag, clearFilters } from "@/store/slices/shortsSlice"

interface TagFilterProps {
  selectedTag?: string
  onTagChange?: (tag: string) => void
}

export function TagFilter({ selectedTag, onTagChange }: TagFilterProps) {
  const dispatch = useAppDispatch()
  const { items, selectedTags } = useAppSelector((state) => state.shorts)

  const allTags = Array.from(new Set(items.flatMap((item) => item.tags)))

  const handleClear = () => {
    if (onTagChange) onTagChange("")
    else dispatch(clearFilters())
  }

  const handleClick = (tag: string) => {
    if (onTagChange) {
      // single-tag selection behavior for the prop-driven mode
      if (selectedTag === tag) onTagChange("")
      else onTagChange(tag)
    } else {
      // fallback to redux multi-tag behavior
      dispatch(toggleTag(tag))
    }
  }

  const isTagSelected = (tag: string) => {
    if (typeof selectedTag === "string") return selectedTag === tag
    return selectedTags.includes(tag)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">Filter by Tags</h3>
        {(isTagSelected("") || selectedTags.length > 0) && (
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground hover:text-foreground"
            onClick={handleClear}
          >
            Clear All
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <Button
            key={tag}
            variant={isTagSelected(tag) ? "default" : "outline"}
            size="sm"
            onClick={() => handleClick(tag)}
            className={
              isTagSelected(tag)
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "border-border text-foreground hover:bg-muted"
            }
          >
            {tag}
          </Button>
        ))}
      </div>
    </div>
  )
}
