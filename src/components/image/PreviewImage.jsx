import React from "react";
import Image from "./Image";

const PreviewImage = ({ imageList, className }) => {
    const renderedImages = imageList.map(image => {
        return <Image src={image} alt='img' className='h-full' />
    })
  return <div className={`${className} w-full h-full`}>{renderedImages}</div>;
};

export default PreviewImage;
