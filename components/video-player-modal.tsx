"use client"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { useAppSelector } from "@/hooks/use-app-selector"
import { closePlayer } from "@/store/slices/uiSlice"
import { X, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function VideoPlayerModal() {
  const dispatch = useAppDispatch()
  const { isPlayerOpen, selectedShortId } = useAppSelector((state) => state.ui)
  const selectedShort = useAppSelector((state) => state.shorts.items.find((s) => s.id === selectedShortId))

  if (!isPlayerOpen || !selectedShort) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4">
      <div className="relative w-full max-w-md">
        <button
          onClick={() => dispatch(closePlayer())}
          className="absolute -top-10 right-0 text-foreground hover:text-primary transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="relative aspect-[9/16] overflow-hidden rounded-lg bg-card">
          <img
            src={selectedShort.videoUrl || "/placeholder.svg"}
            alt={selectedShort.title}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
            <h2 className="text-lg font-bold text-white mb-2">{selectedShort.title}</h2>
            <p className="text-sm text-gray-300 mb-4">{selectedShort.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {selectedShort.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-primary/30 text-xs px-2 py-1 rounded text-primary-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-2 border-border bg-black/50 text-foreground hover:bg-black/70"
              >
                <Heart className="h-4 w-4" />
                {selectedShort.likes}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-2 border-border bg-black/50 text-foreground hover:bg-black/70"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          {selectedShort.views.toLocaleString()} views
        </div>
      </div>
    </div>
  )
}
