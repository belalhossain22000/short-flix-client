import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Short {
  id: string
  title: string
  description: string
  videoUrl: string
  thumbnail: string
  tags: string[]
  views: number
  likes: number
  createdAt: string
}

interface ShortsState {
  items: Short[]
  filteredItems: Short[]
  selectedTags: string[]
  searchQuery: string
  isLoading: boolean
}

const initialState: ShortsState = {
  items: [
    {
      id: "1",
      title: "Amazing City Views",
      description: "Breathtaking aerial footage of the city at sunset",
      videoUrl: "/aerial-city-sunset.jpg",
      thumbnail: "/vibrant-city-skyline.png",
      tags: ["travel", "city", "aerial"],
      views: 12500,
      likes: 845,
      createdAt: "2025-01-15",
    },
    {
      id: "2",
      title: "Mountain Adventure",
      description: "Epic hiking journey through the Rockies",
      videoUrl: "/mountain-hiking.png",
      thumbnail: "/majestic-mountain-peak.png",
      tags: ["adventure", "hiking", "nature"],
      views: 8320,
      likes: 612,
      createdAt: "2025-01-14",
    },
    {
      id: "3",
      title: "Urban Photography",
      description: "Street photography in downtown areas",
      videoUrl: "/urban-streets.jpg",
      thumbnail: "/city-streets.jpg",
      tags: ["photography", "urban", "art"],
      views: 5640,
      likes: 423,
      createdAt: "2025-01-13",
    },
    {
      id: "4",
      title: "Ocean Waves",
      description: "Calm and peaceful ocean scenery",
      videoUrl: "/ocean-waves.png",
      thumbnail: "/tropical-beach.png",
      tags: ["nature", "ocean", "relaxation"],
      views: 9871,
      likes: 756,
      createdAt: "2025-01-12",
    },
    {
      id: "5",
      title: "Forest Walk",
      description: "Peaceful walk through an ancient forest",
      videoUrl: "/forest-path.png",
      thumbnail: "/forest-trees.png",
      tags: ["nature", "forest", "meditation"],
      views: 7234,
      likes: 534,
      createdAt: "2025-01-11",
    },
    {
      id: "6",
      title: "Desert Sunset",
      description: "Golden hour in the desert landscape",
      videoUrl: "/desert-sunset.png",
      thumbnail: "/desert-dunes.png",
      tags: ["nature", "landscape", "sunset"],
      views: 11200,
      likes: 892,
      createdAt: "2025-01-10",
    },
  ],
  filteredItems: [],
  selectedTags: [],
  searchQuery: "",
  isLoading: false,
}

const shortsSlice = createSlice({
  name: "shorts",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
      state.filteredItems = applyFilters(state.items, state.selectedTags, action.payload)
    },
    toggleTag: (state, action: PayloadAction<string>) => {
      const tag = action.payload
      if (state.selectedTags.includes(tag)) {
        state.selectedTags = state.selectedTags.filter((t) => t !== tag)
      } else {
        state.selectedTags.push(tag)
      }
      state.filteredItems = applyFilters(state.items, state.selectedTags, state.searchQuery)
    },
    clearFilters: (state) => {
      state.selectedTags = []
      state.searchQuery = ""
      state.filteredItems = state.items
    },
    addShort: (state, action: PayloadAction<Short>) => {
      state.items.unshift(action.payload)
      state.filteredItems = applyFilters(state.items, state.selectedTags, state.searchQuery)
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    initializeFiltered: (state) => {
      state.filteredItems = state.items
    },
  },
})

function applyFilters(items: Short[], tags: string[], query: string): Short[] {
  return items.filter((item) => {
    const matchesTags = tags.length === 0 || tags.some((tag) => item.tags.includes(tag))
    const matchesQuery =
      query === "" ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    return matchesTags && matchesQuery
  })
}

export const { setSearchQuery, toggleTag, clearFilters, addShort, setLoading, initializeFiltered } = shortsSlice.actions
export default shortsSlice.reducer
