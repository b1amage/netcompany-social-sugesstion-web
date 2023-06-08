import React, { useEffect, useRef, useState } from "react";
import Image from "./Image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useDispatch } from "react-redux";
import { changeImage, removeImage } from "@/features/createLocationFormSlice";
import close from '@/assets/close.svg'
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

const PreviewImage = ({ imageList, src, className }) => {
  const dispatch = useDispatch();
  const [isShowButtonRight, setIsShowButtonRight] = useState(false)
  const [isShowButtonLeft, setIsShowButtonLeft] = useState(false)
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 4,
      spacing: 20,
    },
    slideChanged(s){
      console.log(s)
      if (s.track.details.position >= s.track.details.min && s.track.absToRel > 0){
        setIsShowButtonRight(true)
      } else if(s.track.details.position <= s.track.details.max){
        setIsShowButtonLeft(true)
      } else{
        setIsShowButtonRight(true)
        setIsShowButtonLeft(true)
      }
    }
});

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.reload();
    }
  }, [imageList, sliderRef.current]);

  return (
    <div ref={sliderRef} className={`keen-slider  bg-neutral-100 rounded-lg py-4 ${className}`} key={imageList.length}>
      {imageList.map((image, index) => (
        <div className="relative w-fit rounded-lg keen-slider__slide " key={index}>
          <Image
            className={`h-[20vh] ${src === image && 'border-2 border-black'} hover:opacity-60 duration-300`}
            onClick={() => dispatch(changeImage(image))}
            src={image}
            alt="image"
          />
          <Image 
            className={`absolute  top-0 right-0 bg-black p-1`}
            onClick={() => dispatch(removeImage(image))}
            src={close}
            alt="close"
          />
        </div>
        
      ))}
      {/* <GoChevronLeft  />
      <GoChevronRight  />
      <div className={`${isShowButtonLeft ? 'visible': 'invisible'} bg-black text-white`}>Left</div>
      <div className={`${isShowButtonRight ? 'visible': 'invisible'} bg-black text-white`}>Right</div> */}
    </div>
  );
};

export default PreviewImage;