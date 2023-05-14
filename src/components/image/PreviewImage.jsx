import React from "react";
import Image from "./Image";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";

const PreviewImage = ({
  imageList,
  index,
  className,
  onClick,
  onClickImage,
}) => {
  return (
    <div
      className={`${className} w-full border border-dashed rounded-lg lg:my-0 relative h-full`}
    >
      <Image
        src={imageList[index]}
        alt="img"
        className="absolute inset-0"
        imageClassName=""
        onClick={onClickImage}
      />
      <GoChevronLeft
        className={`top-1/2 -translate-y-1/2 absolute w-[40px] h-[60px] text-xl bg-gray-400/80 rounded-e-lg cursor-pointer hover:opacity-80 ${
          index <= 0 && "pointer-events-none invisible"
        }`}
        onClick={() => onClick(-1)}
      />
      <GoChevronRight
        className={`top-1/2 right-0 absolute -translate-y-1/2 w-[40px] h-[60px] text-xl bg-gray-400/80 rounded-s-lg cursor-pointer hover:opacity-80 ${
          index >= imageList.length - 1 && "pointer-events-none invisible"
        }`}
        onClick={() => onClick(1)}
      />

      <div className="absolute bottom-0 justify-center flex items-end bg-gray-400 font-bold px-4 py-2 rounded-lg -translate-y-1/3 -translate-x-1/2 left-1/2 text-black">
        {index + 1} - {imageList.length}
      </div>
    </div>
  );
};

export default PreviewImage;
