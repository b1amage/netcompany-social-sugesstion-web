import React from "react";
import Image from "./Image";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";
const PreviewImage = ({ imageList, index, className }) => {
  return (
    <div className={`${className} w-full h-full relative`}>
      <Image src={imageList[index]} alt="img" className="h-full" />
      <div className="justify-between absolute inset-0 items-center z-50 flex">
        <GoChevronLeft className="w-[40px] h-[60px] text-xl bg-gray-400 rounded-e-lg cursor-pointer hover:opacity-80" onClick={() => console.log("prev")} />
        <GoChevronRight className="w-[40px] h-[60px] text-xl bg-gray-400 rounded-s-lg cursor-pointer hover:opacity-80" onClick={() => console.log("next")}/>
      </div>
      <div className="absolute z-40 bottom-0 text-white inset-0 justify-center flex items-end">
        {index + 1} / {imageList.length}
      </div>
    </div>
  );
};

export default PreviewImage;
