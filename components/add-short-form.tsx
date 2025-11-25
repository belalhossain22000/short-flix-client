"use client"

import type React from "react"
import { useState } from "react"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { useAppSelector } from "@/hooks/use-app-selector"
import { closeForm } from "@/store/slices/uiSlice"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { addShort as addShortAction } from "@/store/slices/shortsSlice"
import type { Short } from "@/store/slices/shortsSlice"
import { X } from "lucide-react"

export function AddShortForm() {
  const dispatch = useAppDispatch()
  const { isFormOpen } = useAppSelector((state) => state.ui)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tagInput, setTagInput] = useState("")
  const [tags, setTags] = useState<string[]>([])

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      alert("Please enter a title")
      return
    }

    const newShort: Short = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      videoUrl: `/placeholder.svg?height=600&width=400&query=${encodeURIComponent(title)}`,
      thumbnail: `/placeholder.svg?height=225&width=400&query=${encodeURIComponent(title)}`,
      tags: tags.length > 0 ? tags : ["new"],
      views: 0,
      likes: 0,
      createdAt: new Date().toISOString().split("T")[0],
    }

    dispatch(addShortAction(newShort))
    dispatch(closeForm())

    // Reset form
    setTitle("")
    setDescription("")
    setTagInput("")
    setTags([])
  }

  return (
    <Dialog open={isFormOpen} onOpenChange={(open) => !open && dispatch(closeForm())}>
      <DialogContent className="max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Add New Short</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Title</label>
            <Input
              placeholder="Short title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-input text-foreground border-border placeholder:text-muted-foreground"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Description</label>
            <Textarea
              placeholder="Add a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-24 bg-input text-foreground border-border placeholder:text-muted-foreground"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Tags</label>
            <div className="flex gap-2">
              <Input
                placeholder="Add tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddTag()
                  }
                }}
                className="bg-input text-foreground border-border placeholder:text-muted-foreground"
              />
              <Button
                type="button"
                onClick={handleAddTag}
                variant="outline"
                className="border-border text-foreground hover:bg-muted bg-transparent"
              >
                Add
              </Button>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-1 bg-primary/20 px-2 py-1 rounded-full text-xs text-primary-foreground"
                  >
                    {tag}
                    <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-accent">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-border text-foreground hover:bg-muted bg-transparent"
              onClick={() => dispatch(closeForm())}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
              Add Short
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
