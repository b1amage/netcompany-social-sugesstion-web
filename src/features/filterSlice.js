import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    category: "",
    searchInput: "",
    time: { openFrom: "", closeTo: "", dayType: "" },
    searchDistance: null,
  },
  reducers: {
    changeCategory(state, action) {
      state.category = action.payload;
    },
    changeSearchInput(state, action) {
      state.searchInput = action.payload;
    },
    changeTime(state, action) {
      state.time = action.payload;
    },
    changeSearchDistance(state, action) {
      state.searchDistance = action.payload;
    },
  },
});

export const {
  changeCategory,
  changeSearchInput,
  changeSearchDistance,
  changeTime,
} = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
