import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Short {
  id?: string;
  success?: boolean;
  title: string;
  videoUrl: string;
  tags: string[];
}

interface ShortsState {
  items: Short[];
  filteredItems: Short[];
  selectedTags: string[];
  searchQuery: string;
  isLoading: boolean;
}

const initialState: ShortsState = {
  items: [
    {
      id: "1",
      title: "Amazing City Views",
      videoUrl: "/aerial-city-sunset.jpg",
      tags: ["travel", "city", "aerial"],
    },
    {
      id: "2",
      title: "Mountain Adventure",
      videoUrl: "/mountain-hiking.png",
      tags: ["adventure", "hiking", "nature"],
    },
    {
      id: "3",
      title: "Urban Photography",

      videoUrl: "/urban-streets.jpg",

      tags: ["photography", "urban", "art"],
    },
    {
      id: "4",
      title: "Ocean Waves",

      videoUrl: "/ocean-waves.png",

      tags: ["nature", "ocean", "relaxation"],
    },
    {
      id: "5",
      title: "Forest Walk",

      videoUrl: "/forest-path.png",

      tags: ["nature", "forest", "meditation"],
    },
    {
      id: "6",
      title: "Desert Sunset",

      videoUrl: "/desert-sunset.png",

      tags: ["nature", "landscape", "sunset"],
    },
  ],
  filteredItems: [],
  selectedTags: [],
  searchQuery: "",
  isLoading: false,
};

const shortsSlice = createSlice({
  name: "shorts",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredItems = applyFilters(
        state.items,
        state.selectedTags,
        action.payload
      );
    },
    toggleTag: (state, action: PayloadAction<string>) => {
      const tag = action.payload;
      if (state.selectedTags.includes(tag)) {
        state.selectedTags = state.selectedTags.filter((t) => t !== tag);
      } else {
        state.selectedTags.push(tag);
      }
      state.filteredItems = applyFilters(
        state.items,
        state.selectedTags,
        state.searchQuery
      );
    },
    clearFilters: (state) => {
      state.selectedTags = [];
      state.searchQuery = "";
      state.filteredItems = state.items;
    },
    addShort: (state, action: PayloadAction<Short>) => {
      state.items.unshift(action.payload);
      state.filteredItems = applyFilters(
        state.items,
        state.selectedTags,
        state.searchQuery
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    initializeFiltered: (state) => {
      state.filteredItems = state.items;
    },
  },
});

function applyFilters(items: Short[], tags: string[], query: string): Short[] {
  return items.filter((item) => {
    const matchesTags =
      tags.length === 0 || tags.some((tag) => item.tags.includes(tag));
    const matchesQuery =
      query === "" || item.title.toLowerCase().includes(query.toLowerCase());
    return matchesTags && matchesQuery;
  });
}

export const {
  setSearchQuery,
  toggleTag,
  clearFilters,
  addShort,
  setLoading,
  initializeFiltered,
} = shortsSlice.actions;
export default shortsSlice.reducer;
