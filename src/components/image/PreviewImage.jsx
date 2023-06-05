import React, { useEffect, useRef } from "react";
import Image from "./Image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useDispatch } from "react-redux";
import { changeImage } from "@/features/createLocationFormSlice";
import close from '@/assets/close.svg'
const PreviewImage = ({ imageList, onClickImage, src, className }) => {
  const dispatch = useDispatch();
  
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 4,
      spacing: 20,
  },});

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.reload();
    }
  }, [imageList, sliderRef.current]);

  return (
    <div ref={sliderRef} className={`keen-slider  bg-neutral-100 rounded-lg py-4 ${className}`} key={imageList.length}>
      {imageList.map((image, index) => (
        <div className="relative w-fit rounded-lg keen-slider__slide ">
          <Image
            key={index}
            className={`h-[20vh] ${src === image && 'border-2 border-black'} hover:opacity-60 duration-300`}
            onClick={() => dispatch(changeImage(image))}
            src={image}
            alt="image"
          />
          <Image 
            key={index}
            className={`absolute  top-0 right-0 bg-black p-1`}
            onClick={() => dispatch(changeImage(image))}
            src={close}
            alt="image"
          />
        </div>
        
      ))}
    </div>
  );
};

export default PreviewImage;