"use client"
import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { useAppSelector } from "@/hooks/use-app-selector"
import { toggleTag, clearFilters } from "@/store/slices/shortsSlice"

export function TagFilter() {
  const dispatch = useAppDispatch()
  const { items, selectedTags } = useAppSelector((state) => state.shorts)

  const allTags = Array.from(new Set(items.flatMap((item) => item.tags)))

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">Filter by Tags</h3>
        {selectedTags.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground hover:text-foreground"
            onClick={() => dispatch(clearFilters())}
          >
            Clear All
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <Button
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            size="sm"
            onClick={() => dispatch(toggleTag(tag))}
            className={
              selectedTags.includes(tag)
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
