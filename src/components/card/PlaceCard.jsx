import Image from "@/components/image/Image";
import Note from "@/components/note/Note";
import warning from "@/assets/warning.svg";

import { useMemo, useState } from "react";
import { MdDelete } from "react-icons/md";
import Button from "@/components/button/Button";
import { BsFillPencilFill } from "react-icons/bs";
import Wrapper from "@/components/wrapper/Wrapper";
import { useNavigate } from "react-router-dom";

import locationImg from "@/assets/location.svg";

const PlaceCard = ({
  place,
  description,
  className,
  setShowDeletePopup,
  setShowEditPopup,
  setSelectedLocation,
  setNote
}) => {
  // const { imageUrls, name, address } = place;
  const cardSizeStyles = useMemo(() =>
    // "w-[200px] h-[230px] md:w-[250px] md:h-[300px] xl:w-[400px] xl:h-[180px]",
    []
  );

  const navigate = useNavigate();
  const [readMore, setReadMore] = useState(false);

  return (
    <div
      className={`${cardSizeStyles} w-full ${
        place?.location?.isDeleted && "border-2 !border-secondary-400"
      } flex-col gap-3 !p-2 transition-all shadow-lg cursor-pointer md:py-4 xl:pt-6 bg-neutral-400 rounded-xl lg:hover:-translate-y-2 ${className}`}
    >
      {place?.location?.isDeleted && (
        <Note
          wrapperClassName="relative flex justify-end w-full"
          buttonClassName="!relative translate-y-0"
          noteClassName="-top-1.5 !h-auto !w-[160px] sm:!w-[200px] md:!w-[250px] !z-[7900]"
          iconClassName="!w-[40px] md:!w-[30px]"
          src={warning}
          description="This location is already removed from the system!"
        />
      )}
      <Wrapper col="true" className="sm:flex-row py-2 ">
        <Image
          src={place?.location?.imageUrls[0]}
          alt={place?.location?.name}
          className={`!rounded-xl ${!readMore ? "sm:w-[200px] h-[150px]" : "sm:w-[400px] h-[250px]"}`}
          imageClassName=""
          animate
        />

        {/* CONTENT */}
        <div className={`flex flex-col justify-between w-full max-w-4xl !gap-4 ${!readMore && "truncate"}`}>
          {/* TITLE & ADDRESS */}
          <div className="flex flex-col !gap-4">
            <Wrapper className="!justify-between items-center ">
              <h1
                onClick={() => {
                  if (place?.location?.isDeleted) return;
                  navigate(`/location/details/${place?.location?._id}`);
                }}
                className="cursor-pointer text-lg font-semibold w-fit flex gap-4 break-words max-w-full whitespace-normal"
              >
                {place?.location?.name}
              </h1>
              <Wrapper className="!w-fit justify-end">
                <Button
                  onClick={(e) => {
                    // navigate(`/location/edit/${id}`);
                    // editItinerary(itinerary)
                    e.stopPropagation()
                    setSelectedLocation(place);
                    setNote(place?.note)
                    setShowEditPopup(true);
                    console.log("Edit!");
                  }}
                  className="!bg-primary-400 !bg-opacity-40 !text-primary-400 !text-xl !h-fit !my-0 !p-2"
                >
                  <BsFillPencilFill className="text-sm" />
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation()

                    setSelectedLocation(place);

                    setShowDeletePopup(true);
                    console.log("Deleted!");
                  }}
                  className="!bg-danger !bg-opacity-40 !text-danger !text-xl !h-fit !my-0 !p-2"
                >
                  <MdDelete className="text-sm" />
                </Button>
              </Wrapper>
            </Wrapper>
            
            
          <Wrapper
            className="flex items-center cursor-pointer hover:bg-gray-200/60 duration-300 rounded-lg truncate"
          >
            <Image
              src={locationImg}
              alt="location"
              className=" !mx-0"
              imageClassName=""
            />
            <h3 className="text-sm truncate">
              {place?.location?.address}
            </h3>
            </Wrapper>
            
          </div>

          {/* DESCRIPTION */}
          <div
            onClick={() => setReadMore(!readMore)}
            className="mt-2 text-sm text-left"
          >
            <p className={` ${!readMore && "truncate"}`}>
              {description}
            </p>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default PlaceCard;
