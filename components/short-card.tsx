'use client'
import { Card } from "@/components/ui/card"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { openPlayer } from "@/store/slices/uiSlice"
import type { Short } from "@/types/shorts"
import { Play, Pause, Heart, Eye } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface ShortCardProps {
  short: Short
}

export function ShortCard({ short }: ShortCardProps) {
  const dispatch = useAppDispatch()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showControls, setShowControls] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!isPlaying) {
      video.play()
        .then(() => {
          setIsPlaying(true)

          setTimeout(() => {
            setShowControls(false)
          }, 2000)
        })
        .catch(() => { });
    } else {
      video.pause();
      setIsPlaying(false)
      setShowControls(true)
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]

        if (!entry.isIntersecting) {
          video.pause()
          setIsPlaying(false)
          setShowControls(true)
        }
      },
      { threshold: 0.6 } 
    )

    observer.observe(video)

    return () => observer.disconnect()
  }, [])


  const handleVideoEnded = () => {
    setIsPlaying(false)
    setShowControls(true)
  }

  return (
    <Card
      className="group relative aspect-[9/16] cursor-pointer overflow-hidden bg-secondary border-border hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-primary/50"
      onClick={() => dispatch(openPlayer(short?.id))}
      onMouseEnter={() => isPlaying && setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        src={short.videoUrl}
        className="h-full w-full object-cover"
        ref={videoRef}
        onEnded={handleVideoEnded}
      />

      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-between p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Play/Pause button */}
        <div className="flex justify-center items-center h-full">
          <div
            onClick={(e) => { e.stopPropagation(); handlePlay() }}
            className="bg-primary rounded-full p-3 shadow-lg transition-transform duration-300 hover:scale-110"
          >
            {isPlaying ? (
              <Pause className="h-6 w-6 text-white fill-white" />
            ) : (
              <Play className="h-6 w-6 text-white fill-white" />
            )}
          </div>
        </div>

        {/* Info section */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white line-clamp-2 leading-tight">{short.title}</h3>
          {short.tags && short.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {short.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-xs bg-primary/70 text-white px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between text-xs text-gray-300 pt-2 border-t border-white/10">
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              "0"
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              "0"
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
