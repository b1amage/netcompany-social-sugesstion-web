import { createSlice } from "@reduxjs/toolkit";

const createLocationFormSlice = createSlice({
  name: "createLocationForm",
  initialState: {
    images: [],
    image: undefined,
    category: undefined,
    title: "",
    address: "",
    lat: null,
    lng: null,
    description: "",
    weekdayOpenTime: "",
    weekdayCloseTime: "",
    weekendOpenTime: "",
    weekendCloseTime: "",
    minPrice: null,
    maxPrice: null,
    currency: "VND",
    err: undefined,
  },
  reducers: {
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
    changeWeekendOpenTime(state, action) {
      state.weekendOpenTime = action.payload;
    },
    changeWeekendCloseTime(state, action) {
      state.weekendCloseTime = action.payload;
    },
    onSubmitForm(state, action) {
      const data = action.payload;
      console.log(data);
    },
    addImage(state, action) {
      if (state.images.includes(action.payload)) {
        state.err = "Image has been added already!";
        return;
      }
      state.images.push(action.payload);
    },
    removeImage(state, action) {
      return state.images.filter((image) => image !== action.payload);
    },
  },
});

export const {
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
  onSubmitForm,
} = createLocationFormSlice.actions;
export const createLocationFormReducer = createLocationFormSlice.reducer;
