import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    category: undefined,
    searchInput: "",
    weekdayTime: { openTime: "", closeTime: "" },
    weekendTime: { openTime: "", closeTime: "" },
    searchDistance: null,
  },
  reducers: {
    changeCategory(state, action) {
      state.category = action.payload;
    },
    changeSearchInput(state, action) {
      state.searchInput = action.payload;
    },
    changeWeekdayTime(state, action) {
      state.weekdayTime = action.payload;
    },
    changeWeekendTime(state, action) {
      state.weekendTime = action.payload;
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
  changeWeekdayTime,
  changeWeekendTime,
} = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
