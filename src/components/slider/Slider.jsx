import React, { useEffect, useRef, useState } from "react";
import Image from "@/components/image/Image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import close from "@/assets/close.svg";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import Wrapper from "@/components/wrapper/Wrapper";
import ProfileCard from "@/components/card/ProfileCard";

const Slider = ({
  items,
  imgList,
  src,
  className,
  cardClassName,
  perView,
  imageClassName,
  onClick,
  setImgList,
  setImage,
  type,
  loadMore,
}) => {
  const [isShowButtonRight, setIsShowButtonRight] = useState(false);
  const [isShowButtonLeft, setIsShowButtonLeft] = useState(false);

  const handleSlideButtons = (abs, minIdx, maxIdx) => {
    if (abs === minIdx && abs < maxIdx) {
      setIsShowButtonRight(true);
      setIsShowButtonLeft(false);
    } else if (abs > minIdx && abs < maxIdx) {
      setIsShowButtonRight(true);
      setIsShowButtonLeft(true);
    } else if (abs === minIdx && abs === maxIdx) {
      setIsShowButtonLeft(false);
      setIsShowButtonRight(false);
    } else {
      setIsShowButtonLeft(true);
      setIsShowButtonRight(false);
    }
  };

  const [sliderRef, slider] = useKeenSlider({
    slides: {
      perView: perView,
      spacing: 20,
    },
    breakpoints: {
      "(min-width: 800px) and (max-width: 1024px)": {
        slides: {
          perView: 3,
          spacing: 20,
        },
      },
      "(min-width: 550px) and (max-width: 800px)": {
        slides: {
          perView: 2,
          spacing: 20,
        },
      },
      "(max-width: 550px)": {
        slides: {
          perView: 1,
          spacing: 20,
        },
      },
    },
    slideChanged(s) {
      console.log(s);
      const { abs, minIdx, maxIdx } = s.track.details;

      handleSlideButtons(abs, minIdx, maxIdx);
      if (abs === maxIdx) {
        const nextCursor = localStorage.getItem(type === "featuredLocations" ? "featuredNextCursor" : "latestNextCursor");
        console.log(nextCursor);
        if (nextCursor){
          loadMore(nextCursor);
        }
      }
      
    },
    created(s) {
      console.log(s);
      if (s) {
        const { abs, minIdx, maxIdx } = s.track.details;
        handleSlideButtons(abs, minIdx, maxIdx);
      }
    },
    updated(s) {
      if (s) {
        const { abs, minIdx, maxIdx } = s.track.details;
        handleSlideButtons(abs, minIdx, maxIdx);
        
      }
    },
  });

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.reload();
    }
    if (slider) {
      slider.current.update();
      const { abs, minIdx, maxIdx } = slider.current.track.details;
      handleSlideButtons(abs, minIdx, maxIdx);
    }
    console.log(items);
    console.log(imgList);
  }, [ items ,imgList, sliderRef.current]);

  return (
    <Wrapper col="true" className="relative">
      <div
        ref={sliderRef}
        className={`keen-slider bg-primary-400 rounded-lg py-4 ${className}`}
      >
        {items &&
          items.length > 0 &&
          items.map((item, index) => (
            <div
              className={`relative w-fit rounded-lg !bg-transparent keen-slider__slide ${cardClassName}`}
              key={index}
            >
              <ProfileCard
                place={{
                  _id: item._id,
                  imageUrls: item.imageUrls,
                  name: item.name,
                  address: item.address,
                  // description: item.description,
                }}
                className="!w-full"
              />
            </div>
            // <div
            //   className={`relative w-fit rounded-lg keen-slider__slide ${cardClassName}`}
            //   key={index}
            //   onClick={() => onClick(`/location/details/${item._id}`)}
            // >
            //<PlaceCard place={{images: }}/>
            //<Image
            // className={`h-[20vh] ${imageClassName}`}
            // onClick={() => setImage(item.imageUrls[0])}
            // src={item.imageUrls[0]}
            // alt="image"
            // />

            // <Wrapper col="true" className="">
            //   <Heading className="break-words">{item.name}</Heading>

            //   <SubHeading className="truncate">{item.address}</SubHeading>

            //   <SubHeading>{item.description}</SubHeading>
            // </Wrapper>
            // </div>
          ))}

        {imgList &&
          imgList.length > 0 &&
          imgList.map((image, index) => {
            return (
              <div
                className={`relative w-fit rounded-lg keen-slider__slide ${cardClassName}`}
                key={index}
              >
                <Image
                  className={`h-[20vh] ${
                    src === image && "border-2 border-secondary-400"
                  } hover:opacity-60 duration-300 ${imageClassName}`}
                  onClick={() => setImage(image)}
                  src={image}
                  alt="image"
                />
                <Image
                  className={`absolute top-0 right-0 ${
                    src === image ? "bg-secondary-400 p-1" : "hidden"
                  }`}
                  onClick={() => {
                    setImgList(imgList.filter((img) => img !== image));
                    const filterList = imgList.filter((img) => img !== image);
                    if (filterList.length <= 0) {
                      setImage();
                    } else {
                      setImage(filterList[filterList.length - 1]);
                    }
                  }}
                  src={close}
                  alt="close"
                />
              </div>
            );
          })}
      </div>

      <GoChevronLeft
        onClick={(e) => {
          e.stopPropagation() || slider.current?.prev();
        }}
        className={`${
          isShowButtonLeft ? "visible" : "invisible"
        } md:bg-primary-400 cursor-pointer md:text-white h-[40px] w-[40px] rounded-full absolute top-1/2 left-0 -translate-y-1/2 active:scale-150 md:hover:scale-150 duration-300 md:-translate-x-1/2 translate-x-0`}
      />
      <GoChevronRight
        onClick={(e) => {
          e.stopPropagation() || slider.current?.next();
        }}
        className={`${
          isShowButtonRight ? "visible" : "invisible"
        } md:bg-primary-400 cursor-pointer md:text-white h-[40px] w-[40px] rounded-full absolute top-1/2 right-0 -translate-y-1/2 active:scale-150 md:hover:scale-150 duration-300 md:translate-x-1/2 -translate-x-0`}
      />
    </Wrapper>
  );
};

export default Slider;
