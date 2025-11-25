import { configureStore } from "@reduxjs/toolkit"
import shortsReducer from "./slices/shortsSlice"
import uiReducer from "./slices/uiSlice"
import { shortsApi } from "./api/shortsApi"

export const store = configureStore({
  reducer: {
    shorts: shortsReducer,
    ui: uiReducer,
    [shortsApi.reducerPath]: shortsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shortsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
