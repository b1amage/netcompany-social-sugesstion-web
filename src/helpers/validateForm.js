const ERROR = {
    images: "Please add at least 1 picture!",
    image: "The image has been added already!",
    required: "Please fill in this field!",
    time: "Open time must be earlier than close time!",
    price: "Minimum price must be smaller than maximum price!"
}

const VALIDATE = {
    imageList(imgList){
        if (imgList.length <= 0){
            return ERROR.images
        }
    },
    title(name){
        if (name.trim() === '') return ERROR.required
    },
    category(selectedCategory){
        if (selectedCategory === undefined) return ERROR.required
    },
    location(address){
        if (address.trim() === '') return ERROR.required
    },
    description(dsc){
        if (dsc.trim() === '') return ERROR.required
    },
    time(time){
        if (time === '') return ERROR.required
        // if (parseInt(openTime.replace(':', '')) >= parseInt(closeTime.replace(':', ''))) return ERROR.time
    },
    price(price){
        if (price === null) return ERROR.required
        // if (minPrice >= maxPrice) return ERROR.price
    },
}

export default VALIDATE