import { createSlice } from "@reduxjs/toolkit";

const createLocationFormSlice = createSlice({
  name: "createLocationForm",
  initialState: {
    placeId: '',
    images: [],
    image: undefined,
    category: "",
    title: "",
    address: "",
    lat: null,
    lng: null,
    description: "",
    weekdayOpenTime: "",
    weekdayCloseTime: "",
    weekendOpenTime: "",
    weekendCloseTime: "",
    minPrice: "",
    maxPrice: "",
    currency: "",
    err: '',
  },
  reducers: {
    changePlaceId(state, action){
      state.placeId = action.payload
    },
    changeImage(state, action) {
      state.image = action.payload;
    },
    changeCategory(state, action) {
      state.category = action.payload;
    },
    changeTitle(state, action) {
      state.title = action.payload;
    },
    changeAddress(state, action) {
      state.address = action.payload;
    },
    changeLat(state, action) {
      state.lat = action.payload;
    },
    changeLng(state, action) {
      state.lng = action.payload;
    },
    changeDescription(state, action) {
      state.description = action.payload;
    },
    changeWeekdayOpenTime(state, action) {
      state.weekdayOpenTime = action.payload;
    },
    changeWeekdayCloseTime(state, action) {
      state.weekdayCloseTime = action.payload;
    },
    changeMinPrice(state, action) {
      state.minPrice = action.payload;
    },
    changeMaxPrice(state, action) {
      state.maxPrice = action.payload;
    },
    changeCurrency(state, action){
      state.currency = action.payload
    },
    changeWeekendOpenTime(state, action) {
      state.weekendOpenTime = action.payload;
    },
    changeWeekendCloseTime(state, action) {
      state.weekendCloseTime = action.payload;
    },
    addImage(state, action) {
      // if (state.images.includes(action.payload)) {
      //   return;
      // }
      state.images.push(action.payload);
    },
    removeImage(state, action) {
      // return state.images.filter((image) => image !== action.payload);
      const updated = state.images.filter((image) => {
        return image !== action.payload;
      });
      state.images = updated;
      if (state.image === action.payload) state.image = ''
    },
  },
});

export const {
  changePlaceId,
  changeAddress,
  changeLat,
  changeLng,
  changeCategory,
  changeDescription,
  changeImage,
  changeTitle,
  changeWeekdayOpenTime,
  changeWeekdayCloseTime,
  changeWeekendOpenTime,
  changeWeekendCloseTime,
  changeMinPrice,
  changeMaxPrice,
  changeCurrency,
  addImage,
  removeImage,
  changeError,
  onSubmitForm,
} = createLocationFormSlice.actions;
export const createLocationFormReducer = createLocationFormSlice.reducer;
