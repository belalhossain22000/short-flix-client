import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  selectedShortId: string | null | number;
  isPlayerOpen: boolean;
  isFormOpen: boolean;
}

const initialState: UIState = {
  selectedShortId: null,
  isPlayerOpen: false,
  isFormOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openPlayer: (state, action: PayloadAction<string | number>) => {
      state.selectedShortId = action.payload;
      state.isPlayerOpen = true;
    },
    closePlayer: (state) => {
      state.isPlayerOpen = false;
      state.selectedShortId = null;
    },
    openForm: (state) => {
      state.isFormOpen = true;
    },
    closeForm: (state) => {
      state.isFormOpen = false;
    },
  },
});

export const { openPlayer, closePlayer, openForm, closeForm } = uiSlice.actions;
export default uiSlice.reducer;
