import { createSlice } from "@reduxjs/toolkit";

const createLocationFormSlice = createSlice({
    name:'createLocationForm',
    initialState:{
       images: [],
       image: '',
       category: null,
       title: '',
       address: '',
       description: '',
       price: 0 
    },
    reducers: {
        changeImage(state, action){
            state.image = action.payload
        },
        changeCategory(state, action){
            state.category = action.payload
        },
        changeTitle(state, action){
            state.title = action.payload
        },
        changeAddress(state, action){
            state.address = action.payload
        },
        changeDescription(state, action){
            state.description = action.payload
        },
        changePrice(state, action){
            state.price = action.payload
        },
        addImage(state, action){
            state.images.push(state.image)
        },
        removeImage(state, action){
            return state.images.filter(image => image !== action.payload)
        },
        validateLocation(state, action){
            const data = action.payload
            console.log(data)
        }
    }
})

export const {changeAddress, changeCategory, changeDescription, changeImage, changePrice, changeTitle, addImage, removeImage, validateLocation,} = createLocationFormSlice.actions
export const createLocationFormReducer = createLocationFormSlice.reducer