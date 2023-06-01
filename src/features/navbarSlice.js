import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    isMenuClicked: false,
    isAdded: false,
    isShowNotification: false,
    isShowFilter: false,
    currentPath: ''
  },
  reducers: {
    handleOpenSideBarClick(state, action) {
      state.isMenuClicked = true;
    },
    handleCloseSideBarClick(state, action) {
      state.isMenuClicked = false;
    },
    validatePathname(state, action) {
      switch (action.payload) {
        case "/account":
          state.isAdded = true;
          state.isShowNotification = false;
          state.isShowFilter = false;
          return;
        case "/my-event": 
        case "/":
          state.isAdded = true;
          state.isShowNotification = true;
          state.isShowFilter = true;
          return;
        case "/my-route":
          state.isAdded = true;
          state.isShowNotification = false;
          state.isShowFilter = false;
          return;
        default:
          state.isAdded = false;
          state.isShowNotification = false;
          state.isShowFilter = false;
          return;
      }
    },
    // directTo(state, action) {
    //   console.log(action.payload);
    //   state.isMenuClicked = false;
    //   // window.history.pushState({}, '', action.payload)
    //   window.location.href = action.payload
    //   state.isLoading = true
    //   validatePathname(state.currentPath)
    //   state.isLoading = false
    // },
  },
});

export const { handleCloseSideBarClick, handleOpenSideBarClick, validatePathname } =
  navbarSlice.actions;
export const navbarReducer = navbarSlice.reducer;
