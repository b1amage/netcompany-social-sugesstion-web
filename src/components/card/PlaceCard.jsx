import Image from "@/components/image/Image";
import React from "react";

const PlaceCard = ({ place }) => {
  const { images, title, address, description } = place;
  return (
    <div className="w-[200px] h-[230px] md:w-[250px] md:h-[300px] xl:w-[400px] xl:h-[180px] py-3 md:py-4 xl:pt-6 px-6 bg-neutral-300 flex-center flex-col xl:flex-row xl:items-start rounded-xl gap-3 shadow-lg cursor-pointer transition-all lg:hover:-translate-y-2">
      <Image
        src={images[0]}
        alt={title}
        className="w-full h-[180px] md:h-[200px] xl:h-[132px] !rounded-xl xl:w-2/5"
        animate
      />

      {/* CONTENT */}
      <div className="px-3 xl:w-3/5">
        {/* TITLE & ADDRESS */}
        <div className="flex-col gap-1 text-center flex-center xl:items-start xl:text-left">
          <h1 className="text-lg font-semibold text-overflow-ellipsis">
            {title}
          </h1>
          <h3 className="text-sm italic text-overflow-ellipsis text-neutral-500">
            {address}
          </h3>
        </div>

        {/* DESCRIPTION */}
        <div className="hidden mt-2 text-sm italic text-left xl:block text-neutral-700">
          <p className="text-overflow-ellipsis-3-clamp">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
