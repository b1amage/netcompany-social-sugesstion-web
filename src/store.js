import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/userSlice.js";
import { navbarReducer } from "@/features/navbarSlice";
import { createLocationFormReducer } from "@/features/createLocationFormSlice";
import { currentLocationReducer } from "@/features/currentLocationSlice";
import { filterReducer } from "@/features/filterSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    navbar: navbarReducer,
    createLocationForm: createLocationFormReducer,
    currentLocation: currentLocationReducer,
    filter: filterReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  
});
