import React, { useEffect, useRef } from "react";
import Image from "./Image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useDispatch } from "react-redux";
import { changeImage } from "@/features/createLocationFormSlice";
import Heading from "@/components/typography/Heading";
import SubHeading from "@/components/typography/SubHeading";
import Wrapper from "@/components/wrapper/Wrapper";
import Label from "@/components/form/Label";
const PreviewImage = ({
  imageList,
  label,
  name,
  address,
  description,
  src,
  className,
  cardClassName,
  close,
  perView,
  imageClassName
}) => {
  const dispatch = useDispatch();

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: perView,
      spacing: 15,
    },
  });

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.reload();
    }
  }, [imageList, sliderRef.current]);

  return (
    <Wrapper col className="mt-4">
      <Label>{label}</Label>
      <div
        ref={sliderRef}
        className={`keen-slider  bg-neutral-100 rounded-lg py-4 ${className}`}
        key={imageList.length}
      >
        {imageList.map((image, index) => (
          <Wrapper
            col
            className={`relative w-fit rounded-lg keen-slider__slide ${cardClassName}`}
            key={index}
          >
            <Image
              className={`h-[20vh] ${
                src === image && "border-2 border-black"
              } hover:opacity-60 duration-300 ${imageClassName}`}
              onClick={() => dispatch(changeImage(image))}
              src={image}
              alt="image"
            />
            {close && (
              <Image
                key={index}
                className={`absolute  top-0 right-0 bg-black p-1`}
                onClick={() => dispatch(changeImage(image))}
                src={close}
                alt="image"
              />
            )}
            <Wrapper col className="">
              {label && <Heading className="break-words">{name}</Heading>}
              {address && (
                <SubHeading className="truncate">{address}</SubHeading>
              )}
              {description && <SubHeading>{description}</SubHeading>}
            </Wrapper>
          </Wrapper>
        ))}
      </div>
    </Wrapper>
  );
};

export default PreviewImage;
