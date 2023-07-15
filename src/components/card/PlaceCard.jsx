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
import Heading from "@/components/typography/Heading";
import SubHeading from "@/components/typography/SubHeading";

const PlaceCard = ({
  place,
  className,
  setShowDeletePopup,
  setSelectedLocation,
  ...props
}
) => {
  const navigate = useNavigate();
  return (
    <Wrapper
      {...props}
      onClick={() => {
        navigate(`/itinerary/location/details/${place._id}`, {
          state: {
            location: place,
          },
        });
      }}
      col="true"
      className={`w-full ${
        place?.location?.isDeleted && "border-2 !border-secondary-400"
      } sm:flex-row gap-3 !p-2 transition-all shadow-lg cursor-pointer md:py-4 xl:pt-6 bg-neutral-400 rounded-xl lg:hover:-translate-y-2 ${className}`}
    >
      <Image
        src={place?.location?.imageUrls[0]}
        alt={place?.location?.name}
        className={`!rounded-xl sm:w-[400px] sm:h-[150px] h-[250px]`}
        imageClassName=""
        animate
      />

      <Wrapper col="true" className="w-full !relative justify-between">
        <Wrapper col="true" className="">
          <Wrapper className="items-center ">
            <Wrapper className="w-full items-center">
              <Heading
                className="text-overflow-ellipsis-2-clamp hover:underline "
                onClick={(e) => {
                  e.stopPropagation();

                  navigate(!place?.location?.isDeleted ?(`/location/details/${place?.location?._id})`) : "/error/This location no longer exists" );
                }}
              >
                {place?.location?.name}
              </Heading>
              {place?.location?.isDeleted && (
                <Note
                  wrapperClassName="relative"
                  buttonClassName="!relative !top-0 translate-y-0 "
                  noteClassName="!-top-1.5 !h-auto !w-[160px] sm:!w-[200px] md:!w-[250px] !left-0"
                  iconClassName="!w-[40px] md:!w-[30px]"
                  src={warning}
                  description="This location is already removed from the system!"
                />
              )}
            </Wrapper>

            <Wrapper className="items-center w-fit ">
              <Wrapper className="!w-fit justify-end">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();

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
          </Wrapper>

          <Wrapper className="flex items-center cursor-pointer hover:bg-gray-200/60 duration-300 rounded-lg ">
            <Image
              src={locationImg}
              alt="location"
              className=" !mx-0"
              imageClassName=""
            />
            <SubHeading className="!text-[12px] sm:!text-[14px] !text-black text-overflow-ellipsis">
              {place?.location?.address}
            </SubHeading>
          </Wrapper>
        </Wrapper>

        <SubHeading
          className={`!text-[12px] sm:!text-[14px] !text-black text-overflow-ellipsis break-all`}
        >
          {place?.note}
        </SubHeading>
      </Wrapper>
    </Wrapper>
  );
};

export default PlaceCard;
