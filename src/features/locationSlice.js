import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "createLocationForm",
  initialState: {
    location: undefined
  },
  reducers: {
    changeLocation(state, action){
      state.location = action.payload
    },
  },
});

export const {
  changeLocation
} = locationSlice.actions;
export const locationReducer = locationSlice.reducer;
