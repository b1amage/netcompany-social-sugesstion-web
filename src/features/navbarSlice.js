const { createSlice } = require("@reduxjs/toolkit");
const { useNavigate } = require("react-router-dom");

const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    navigate: useNavigate(),
    isMenuClicked: false,
    isAdded: false,
    isShowNotification: false,
    isShowFilter: false,
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
          state.isAdded = true
          state.isShowNotification = false;
          state.isShowFilter = false;
          return;
        case "/my-event":
          state.isAdded = true
          state.isShowNotification = true;
          state.isShowFilter = true;
          return;
        case "/my-route":
          state.isAdded = true
          state.isShowNotification = false;
          state.isShowFilter = false;
          return;
        case "/plan-event":
          state.isAdded = false;
          state.isShowNotification = false;
          state.isShowFilter = false;
          return;
        default:
          state.isAdded = true
          state.isShowNotification = true;
          state.isShowFilter = true;
          return;
      }
    },
    handleNavButtonClick(state, action) {
        this.validatePathname(action.payload)
        state.navigate(action.payload)
        state.isMenuClicked = false
    },
  },
});

export const {handleCloseSideBarClick, handleNavButtonClick, handleOpenSideBarClick} = navbarSlice.actions
export const navbarReducer = navbarSlice.reducer
export const {isAdded, isMenuClicked, isShowNotification, isShowFilter} = navbarSlice.getInitialState()