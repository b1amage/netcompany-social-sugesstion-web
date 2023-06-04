import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/userSlice.js";
import { navbarReducer } from "@/features/navbarSlice";
import { createLocationFormReducer } from "@/features/createLocationFormSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    navbar: navbarReducer,
    createLocationForm: createLocationFormReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  
});
