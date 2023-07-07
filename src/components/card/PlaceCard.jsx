import Image from "@/components/image/Image";
import Note from "@/components/note/Note";
import warning from "@/assets/warning.svg";

import { useMemo, useState } from "react";
import { MdDelete } from "react-icons/md";
import Button from "@/components/button/Button";
import { BsFillPencilFill } from "react-icons/bs";
import Wrapper from "@/components/wrapper/Wrapper";

const PlaceCard = ({ place, description, className }) => {
  // const { imageUrls, name, address } = place;
  const cardSizeStyles = useMemo(() =>
    // "w-[200px] h-[230px] md:w-[250px] md:h-[300px] xl:w-[400px] xl:h-[180px]",
    []
  );

  const [readMore, setReadMore] = useState(false);

  return (
    <div
      className={`${cardSizeStyles} flex-col gap-3 px-6 py-3 transition-all shadow-lg cursor-pointer  md:py-4 xl:pt-6 bg-neutral-300 flex-center xl:flex-row xl:items-start rounded-xl lg:hover:-translate-y-2 ${className}`}
    >
      {place?.isDeleted && (
        <Note
          wrapperClassName="relative flex justify-end w-full"
          buttonClassName="!relative translate-y-0"
          noteClassName="-top-1 !h-auto !w-[160px] sm:!w-[200px] md:!w-[250px] !z-[7900]"
          iconClassName="!w-[40px] md:!w-[30px]"
          src={warning}
          description="This location is already removed from the system!"
        />
      )}
      <Image
        src={place?.imageUrls[0]}
        alt={place?.name}
        className="w-full sm:h-[180px] !rounded-xl xl:w-2/5"
        animate
      />

      {/* CONTENT */}
      <div className="px-3 w-full sm:h-[180px] flex flex-col justify-between ">
        {/* TITLE & ADDRESS */}
        <div className="flex flex-col !gap-4">
          <Wrapper className="!justify-between items-center">
            <h1 className="text-lg font-semibold w-fit flex gap-4">
              {place?.name}
            </h1>
            <Wrapper className="!w-fit">
              <Button
                onClick={() => {
                  // navigate(`/location/edit/${id}`);
                  // editItinerary(itinerary)
                  console.log("Edit!");
                }}
                className="!bg-primary-400 !bg-opacity-40 !text-primary-400 !text-xl !h-fit !my-0 !p-2"
              >
                <BsFillPencilFill className="text-sm" />
              </Button>
              <Button
                onClick={() => {
                  // setSelectedItinerary(itinerary)
                  // setShowDeletePopup(true)}
                  console.log("Deleted!");
                }}
                className="!bg-danger !bg-opacity-40 !text-danger !text-xl !h-fit !my-0 !p-2"
              >
                <MdDelete className="text-sm" />
              </Button>
            </Wrapper>
          </Wrapper>

          <h3 className="text-sm italic text-neutral-500">{place?.address}</h3>
        </div>

        {/* DESCRIPTION */}
        <div
          onClick={() => setReadMore(!readMore)}
          className="mt-2 text-sm italic text-left xl:block text-neutral-700"
        >
          <p className={`${!readMore && "text-overflow-ellipsis-3-clamp"}`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
