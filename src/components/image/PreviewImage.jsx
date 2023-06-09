import React, { useEffect, useRef, useState } from "react";
import Image from "./Image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useDispatch } from "react-redux";
import { changeImage, removeImage } from "@/features/createLocationFormSlice";
import close from "@/assets/close.svg";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import Wrapper from "@/components/wrapper/Wrapper";

const PreviewImage = ({ imageList, src, className }) => {
  const dispatch = useDispatch();
  const [isShowButtonRight, setIsShowButtonRight] = useState(false);
  const [isShowButtonLeft, setIsShowButtonLeft] = useState(false);
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 4,
      spacing: 20,
    },
    slideChanged(s) {
      const { abs, minIdx, maxIdx } = s.track.details

      if (abs === minIdx) {
        setIsShowButtonRight(true);
        setIsShowButtonLeft(false);
      } else if (abs > minIdx && abs < maxIdx) {
        setIsShowButtonRight(true);
        setIsShowButtonLeft(true);
      } else {
        setIsShowButtonLeft(true);
        setIsShowButtonRight(false);
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
        className={`keen-slider  bg-neutral-100 rounded-lg py-4 ${className}`}
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
              className={`absolute  top-0 right-0 bg-black p-1`}
              onClick={() => dispatch(removeImage(image))}
              src={close}
              alt="close"
            />
          </div>
        ))}
        
      </div>

        <GoChevronLeft
          onClick={() => {
            sliderRef.current?.moveToIdx((i) => i-1)
          }}
          className={`${
            isShowButtonLeft ? "visible" : "invisible"
          } bg-black/90 hover:opacity-70 cursor-pointer text-white h-[40px] w-[40px] rounded-r-lg  p-2 absolute top-1/2 left-0 -translate-y-1/2`}
        />
        <GoChevronRight
        onClick={() => {
          sliderRef.current?.moveToIdx((i) => i+1)
        }}
          className={`${
            isShowButtonRight ? "visible" : "invisible"
          } bg-black/90 hover:opacity-70 cursor-pointer text-white h-[40px] w-[40px] rounded-l-lg absolute top-1/2 right-0 -translate-y-1/2`}
        />
    </Wrapper>
  );
};

export default PreviewImage;
