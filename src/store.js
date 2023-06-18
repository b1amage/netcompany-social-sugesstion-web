import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/userSlice.js";
import { navbarReducer } from "@/features/navbarSlice";
import { createLocationFormReducer } from "@/features/createLocationFormSlice";
import { currentLocationReducer } from "@/features/currentLocationSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    navbar: navbarReducer,
    createLocationForm: createLocationFormReducer,
    currentLocation: currentLocationReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  
});
