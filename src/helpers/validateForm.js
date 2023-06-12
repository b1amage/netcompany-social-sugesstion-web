const ERROR = {
    images: "Please add at least 1 picture!",
    imageType: "Invalid image type. Please select different file!",
    imageSize: "Please select image which size is lower than 3MB!",
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
        if (selectedCategory.title === undefined) return ERROR.required
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
    price(minPrice, maxPrice){
        // if (price === null) return ERROR.required
        if((minPrice && !maxPrice) || (!minPrice && maxPrice)) return ERROR.required
        if (parseInt(minPrice) >= parseInt(maxPrice)) return ERROR.price
    },
    selectedImage(file) {
        const MAX_FILE_SIZE = 3072 
        const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
        const fileSizeKiloBytes = file.size / 1024
        console.log(file.type)
        console.log(fileSizeKiloBytes)
        if (!validImageTypes.includes(file.type)){
            return ERROR.imageType
        }
        if(fileSizeKiloBytes > MAX_FILE_SIZE){
          return ERROR.imageSize
        }
    }
}

export default VALIDATE