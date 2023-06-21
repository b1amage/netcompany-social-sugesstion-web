import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/userSlice.js";
import { navbarReducer } from "@/features/navbarSlice";
import { locationReducer } from "@/features/locationSlice";
import { currentLocationReducer } from "@/features/currentLocationSlice";
import { filterReducer } from "@/features/filterSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    navbar: navbarReducer,
    location: locationReducer,
    currentLocation: currentLocationReducer,
    filter: filterReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  
});
