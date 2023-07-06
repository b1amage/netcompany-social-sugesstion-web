import Image from "@/components/image/Image";
import { useMemo } from "react";

const PlaceCard = ({ place , description, className }) => {
  // const { imageUrls, name, address } = place;
  const cardSizeStyles = useMemo(
    () =>
      // "w-[200px] h-[230px] md:w-[250px] md:h-[300px] xl:w-[400px] xl:h-[180px]",
    []
  );
  return (
    <div
      className={`${cardSizeStyles} flex-col gap-3 px-6 py-3 transition-all shadow-lg cursor-pointer  md:py-4 xl:pt-6 bg-neutral-300 flex-center xl:flex-row xl:items-start rounded-xl lg:hover:-translate-y-2 ${className}`}
    >
      <Image
        src={place?.imageUrls[0]}
        alt={place?.name}
        className="w-full h-[180px] md:h-[200px] md:w-[400px] !rounded-xl xl:w-2/5"
        animate
      />

      {/* CONTENT */}
      <div className="px-3 w-full">
        {/* TITLE & ADDRESS */}
        <div className="flex-col gap-1 text-center flex-center xl:items-start xl:text-left">
          <h1 className="text-lg font-semibold text-overflow-ellipsis">
            {place?.name}
          </h1>
          <h3 className="text-sm italic text-overflow-ellipsis text-neutral-500">
            {place?.address}
          </h3>
        </div>

        {/* DESCRIPTION */}
        <div className=" mt-2 text-sm italic text-left xl:block text-neutral-700">
          <p className="text-overflow-ellipsis-3-clamp">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
