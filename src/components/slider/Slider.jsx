import React, { useEffect, useRef, useState } from "react";
import Image from "../image/Image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useDispatch } from "react-redux";
import { changeImage, removeImage } from "@/features/createLocationFormSlice";
import close from "@/assets/close.svg";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import Wrapper from "@/components/wrapper/Wrapper";

const Slider = ({ imageList, src, className }) => {
  const dispatch = useDispatch();
  const [isShowButtonRight, setIsShowButtonRight] = useState(false);
  const [isShowButtonLeft, setIsShowButtonLeft] = useState(false);

  const handleSlideButtons = (abs, minIdx, maxIdx) => {
    if (abs === minIdx && abs < maxIdx) {
      setIsShowButtonRight(true);
      setIsShowButtonLeft(false);
    } else if (abs > minIdx && abs < maxIdx) {
      setIsShowButtonRight(true);
      setIsShowButtonLeft(true);
    } else if (abs === minIdx && abs === maxIdx){
      setIsShowButtonLeft(false);
      setIsShowButtonRight(false);
    } 
    else{
      setIsShowButtonLeft(true);
      setIsShowButtonRight(false);
    }
  }

  const [sliderRef, slider] = useKeenSlider({
    slides: {
      perView: 4,
      spacing: 20,
    },
    slideChanged(s) {
      console.log(s)
      const { abs, minIdx, maxIdx } = s.track.details

      handleSlideButtons(abs,minIdx, maxIdx)
    },
    created(s){
      console.log(s)
      if (s){
        const { abs, minIdx, maxIdx } = s.track.details
        handleSlideButtons(abs,minIdx, maxIdx)
      }
    },
    
    
  });

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.reload();
    }
  }, [imageList, sliderRef.current]);

  return (
    <Wrapper col className="relative">
      <div
        ref={sliderRef}
        className={`keen-slider  bg-primary-400 rounded-lg py-4 ${className}`}
        key={imageList.length}
      >
        {imageList.map((image, index) => (
          <div
            className="relative w-fit rounded-lg keen-slider__slide "
            key={index}
          >
            <Image
              className={`h-[20vh] ${
                src === image && "border-2 border-secondary-400"
              } hover:opacity-60 duration-300`}
              onClick={() => dispatch(changeImage(image))}
              src={image}
              alt="image"
            />
            <Image
              className={`absolute  top-0 right-0 ${src === image ? "bg-secondary-400 p-1" : "hidden"}`}
              onClick={() => dispatch(removeImage(image))}
              src={close}
              alt="close"
            />
          </div>
        ))}
        
      </div>

        <GoChevronLeft
          onClick={(e) => {
            e.stopPropagation() || slider.current?.prev();
          }}
          className={`${
            isShowButtonLeft ? "visible" : "invisible"
          } bg-primary-400 hover:opacity-70 cursor-pointer text-white h-[40px] w-[28px] rounded-l-lg p-1 absolute top-1/2 left-0 -translate-y-1/2 -translate-x-full`}
        />
        <GoChevronRight
        onClick={(e) => {
          e.stopPropagation() || slider.current?.next();

        }}
          className={`${
            isShowButtonRight ? "visible" : "invisible"
          } bg-primary-400 hover:opacity-70 cursor-pointer text-white h-[40px] w-[28px] rounded-r-lg absolute top-1/2 right-0 -translate-y-1/2 translate-x-full`}
        />
    </Wrapper>
  );
};

export default Slider;
