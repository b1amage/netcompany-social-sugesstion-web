import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/userSlice.js";
import { navbarReducer } from "@/features/navbarSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    navbar: navbarReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  
});
