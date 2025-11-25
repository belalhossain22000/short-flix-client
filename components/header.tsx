"use client"
import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { openForm } from "@/store/slices/uiSlice"
import { Plus } from "lucide-react"

export function Header() {
  const dispatch = useAppDispatch()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">SF</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">Short-flix</h1>
        </div>
        <Button onClick={() => dispatch(openForm())} className="gap-2 bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline cursor-pointer">Add Short</span>
        </Button>
      </div>
    </header>
  )
}
