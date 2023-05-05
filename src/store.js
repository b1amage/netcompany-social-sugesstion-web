import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/userSlice.js";
import { navbarReducer } from "@/features/navbarSlice";
import {isAdded, isMenuClicked, isShowNotification, isShowFilter, handleCloseSideBarClick, handleNavButtonClick, handleOpenSideBarClick} from '@/features/navbarSlice'

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

export {isAdded, isMenuClicked, isShowNotification, isShowFilter, handleCloseSideBarClick, handleNavButtonClick, handleOpenSideBarClick}