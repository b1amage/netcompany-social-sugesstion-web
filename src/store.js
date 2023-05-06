import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/userSlice.js";
import { navbarReducer } from "@/features/navbarSlice";
import { handleCloseSideBarClick, directTo, handleOpenSideBarClick, validatePathname} from '@/features/navbarSlice'

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

export { handleCloseSideBarClick, directTo, handleOpenSideBarClick, validatePathname}