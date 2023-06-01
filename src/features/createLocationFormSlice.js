import { createSlice } from "@reduxjs/toolkit";

const createLocationFormSlice = createSlice({
    name:'createLocationForm',
    initialState:{
       images: [],
       image: undefined,
       category: undefined,
       title: '',
       address: '',
       description: '',
       price: 0,
       currency: 'VND',
       err: undefined,
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
        changeCurrency(state, action){
            state.currency = action.payload
        },
        onSubmitForm(state, action){
            const data = action.payload
            console.log(data)
        },
        addImage(state, action){
            if (state.images.includes(action.payload)){
                state.err = 'Image has been added already!'
                return
            }
            state.images.push(action.payload)
        },
        removeImage(state, action){
            return state.images.filter(image => image !== action.payload)
        },
    }
})

export const {changeAddress, changeCategory, changeDescription, changeImage, changePrice, changeTitle, addImage, removeImage, onSubmitForm, changeCurrency} = createLocationFormSlice.actions
export const createLocationFormReducer = createLocationFormSlice.reducer