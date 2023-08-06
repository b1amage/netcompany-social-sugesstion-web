import Button from "@/components/button/Button";
import Heading from "@/components/typography/Heading";
import SubHeading from "@/components/typography/SubHeading";
import Wrapper from "@/components/wrapper/Wrapper";
import Popup from "@/components/popup/Popup";
import React, { useRef, useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import itineraryApi from "@/api/itineraryApi";
import { toast } from "react-hot-toast";
import Note from "@/components/note/Note";
import warning from "@/assets/warning.svg"
import { useNavigate } from "react-router-dom";
import useOnClickOutside from "@/hooks/useOnClickOutside";
const ItineraryCard = ({itinerary, setSelectedItinerary, setShowDeletePopup, editItinerary}) => {
  const { _id, name, numOfLocations, hasDeletedLocation } = itinerary
  const navigate = useNavigate()

  const handleWrapperClick = () => {
    // add here what you want to do when clicking the Wrapper
    navigate(`/itinerary/details/${_id}`)
  }

  return (
    <Wrapper className="duration-300 border md:hover:border-b-4 md:hover:border-r-4 md:hover:border-b-neutral-600 md:hover:border-r-neutral-600 md:hover:drop-shadow relative bg-neutral-300 rounded-2xl justify-around items-center px-4 w-full h-[168px]">
        <Wrapper onClick={handleWrapperClick} col="true" className="py-6 w-full break-all cursor-pointer">
          <Heading className="break-words text-[16px] md:!text-[20px]">{name}</Heading>
          <Heading className="!text-[14px] md:!text-[16px] relative flex gap-4"> {numOfLocations} Locations {hasDeletedLocation && <Note wrapperClassName="relative" buttonClassName="!relative !z-[1000]" noteClassName="left-0 !h-auto !w-[160px] sm:!w-[200px] md:!w-[320px] !z-[7900]" iconClassName="!w-[40px] md:!w-[20px]" src={warning} description="This itinerary contains a deleted location!" />}</Heading>
        </Wrapper>

        <Wrapper className="!w-fit">
          <Button
            onClick={(e) => {
              e.stopPropagation()
              editItinerary(itinerary)
            }}
            className="!bg-primary-400 !bg-opacity-40 !text-primary-400 !text-xl !h-fit !my-0"
          >
            <BsFillPencilFill className="text-sm" />
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation()
              setSelectedItinerary(itinerary)
              setShowDeletePopup(true)}
            }
            className="!bg-danger !bg-opacity-40 !text-danger !text-xl !h-fit !my-0"
          >
            <MdDelete className="text-sm" />
          </Button>
        </Wrapper>
    </Wrapper>
  );
};

export default ItineraryCard;
