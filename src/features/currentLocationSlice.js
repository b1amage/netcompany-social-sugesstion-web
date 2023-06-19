import { createSlice } from "@reduxjs/toolkit";

const currentLocationSlice = createSlice({
  name: "currentLocation",
  initialState: {
    currentLocation: undefined,
    latitude: undefined,
    longitude: undefined,
  },
  reducers: {
    changeCurrentLocation(state, action) {
      state.currentLocation = action.payload;
    },
    changeLatitude(state, action){
        state.latitude = action.payload
    },
    changeLongitude(state, action){
        state.longitude = action.payload
    },
  },
});

export const { changeCurrentLocation, changeLatitude, changeLongitude } =
  currentLocationSlice.actions;
export const currentLocationReducer = currentLocationSlice.reducer;
