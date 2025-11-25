"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { SearchBar } from "@/components/search-bar"
import { TagFilter } from "@/components/tag-filter"
import { ShortsGrid } from "@/components/shorts-grid"
import { VideoPlayerModal } from "@/components/video-player-modal"
import { AddShortForm } from "@/components/add-short-form"

export default function HomeClient() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedTag, setSelectedTag] = useState("")

    return (
        <main className="min-h-screen bg-background">
            <Header />

            <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
                <div className="space-y-6">
                    <div className="max-w-md">
                        <SearchBar value={searchTerm} onChange={setSearchTerm} />
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
                        <aside className="md:col-span-1">
                            <div className="sticky top-24 space-y-6">
                                <TagFilter selectedTag={selectedTag} onTagChange={setSelectedTag} />
                            </div>
                        </aside>

                        <section className="md:col-span-4">
                            <ShortsGrid searchTerm={searchTerm} selectedTag={selectedTag} />
                        </section>
                    </div>
                </div>
            </div>

            <VideoPlayerModal />
            <AddShortForm />
        </main>
    )
}