import React, { useState } from "react";
import Image from "./Image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useDispatch } from "react-redux";
import { changeImage } from "@/features/createLocationFormSlice";
const PreviewImage = ({
  imageList,
  index,
  src,
  className,
  onClick,
  onClickImage,
}) => {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 4,
      spacing: 15,
    },
  });
  const dispatch = useDispatch();
  return (
    <div
      className={`${className} flex flex-col  gap-4  border border-dashed border-black rounded-lg lg:my-0 relative h-full`}
    >
      <Image
        src={src}
        alt="img"
        className=""
        imageClassName=""
        onClick={onClickImage}
      />

      <div ref={sliderRef} className="keen-slider">
        {imageList.length > 0 &&
          imageList.map((image, index) => {
            return (
              <Image
                key={index}
                className="keen-slider__slide"
                onClick={() => dispatch(changeImage(image))}
                src={image}
                alt="image"
              />
            );
          })}
      </div>
    </div>
  );
};

export default PreviewImage;
