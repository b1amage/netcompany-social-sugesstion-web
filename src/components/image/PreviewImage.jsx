import React, { useState } from "react";
import Image from "./Image";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";

const PreviewImage = ({
  imageList,
  index,
  className,
  onClick,
  onClickImage,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={`${className} w-full border border-dashed rounded-lg lg:my-0 relative h-full`}
      onMouseLeave={() => setIsHovered(false)}
      onMouseEnter={() => setIsHovered(true)}
    >
      {imageList.length > 0 && (
        <>
          <Image
            src={imageList[index]}
            alt="img"
            className="absolute inset-0"
            imageClassName=""
            onClick={onClickImage}
          />
          <GoChevronLeft
            className={`top-1/2 -translate-y-1/2 absolute w-[40px] h-[60px] text-xl text-white bg-black/80 rounded-e-lg cursor-pointer active:opacity-80 ${
              (index <= 0 || !isHovered) && "pointer-events-none invisible"
            }`}
            onClick={() => onClick(-1)}
          />
          <GoChevronRight
            className={`top-1/2 right-0 absolute -translate-y-1/2 w-[40px] h-[60px] text-xl text-white bg-black/80 rounded-s-lg cursor-pointer active:opacity-80 ${
              (index >= imageList.length - 1 || !isHovered) && "pointer-events-none invisible"
            }`}
            onClick={() => onClick(1)}
          />

          <div
            className={`absolute bottom-0 justify-center flex items-end bg-black/80 font-bold px-4 py-2 rounded-lg ${
              isHovered ? "-translate-y-1/3" : "invisible -translate-y-0 "
            } duration-300 -translate-x-1/2 left-1/2 text-white`}
          >
            {index + 1} - {imageList.length}
          </div>
        </>
      )}
    </div>
  );
};

export default PreviewImage;
