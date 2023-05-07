import React from "react";
import Image from "./Image";

const PreviewImage = ({ imageList, className }) => {
    const renderedImages = imageList.map(image => {
        return <Image src={image} alt='img' />
    })
  return <div className={`${className} `}>{renderedImages}</div>;
};

export default PreviewImage;
