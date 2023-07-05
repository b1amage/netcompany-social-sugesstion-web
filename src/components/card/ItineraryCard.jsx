import Button from "@/components/button/Button";
import Heading from "@/components/typography/Heading";
import SubHeading from "@/components/typography/SubHeading";
import Wrapper from "@/components/wrapper/Wrapper";
import Popup from "@/components/popup/Popup";
import React, { useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import itineraryApi from "@/api/itineraryApi";
import { toast } from "react-hot-toast";
import Note from "@/components/note/Note";
import warning from "@/assets/warning.svg"
const ItineraryCard = ({ itinerary, setSelectedItinerary, setShowDeletePopup,editItinerary}) => {
  const { name, numOfLocations, hasDeletedLocation } = itinerary
  
  return (
    <>
      <Wrapper className=" cursor-pointer duration-300 border md:hover:border-b-4 md:hover:border-r-4 md:hover:border-b-neutral-600 md:hover:border-r-neutral-600 md:hover:drop-shadow  bg-neutral-300 rounded-2xl justify-around items-center px-4 py-6 gap-8">
        <Wrapper col="true" className="w-full">
          <Heading className="truncate text-[16px] md:!text-[20px]">{name}</Heading>
          {/* <Wrapper className=""> */}
            <Heading className="!text-[14px] md:!text-[16px] relative flex gap-4"> {numOfLocations} Locations {hasDeletedLocation && <Note wrapperClassName="relative" buttonClassName="!relative" noteClassName="left-0 !h-auto !w-fit" iconClassName="!w-[60px] md:!w-[60px]" src={warning} description="This itinerary contains a deleted location!" />}</Heading>
            
          {/* </Wrapper> */}
          {/* <SubHeading className="!text-[12px] !text-neutral-600 md:!text-[14px]">Created at: {createdAt}</SubHeading> */}
        </Wrapper>
        {/* <Wrapper> */}
        <Wrapper className="!w-fit">
          <Button
            onClick={() => {
              // navigate(`/location/edit/${id}`);
              editItinerary(itinerary)
            }}
            className="!bg-primary-400 !bg-opacity-40 !text-primary-400 !text-xl !h-fit"
          >
            <BsFillPencilFill />
          </Button>
          <Button
            onClick={() => {
              setSelectedItinerary(itinerary)
              setShowDeletePopup(true)}
            }
            className="!bg-danger !bg-opacity-40 !text-danger !text-xl !h-fit"
          >
            <MdDelete />
          </Button>
        </Wrapper>
        {/* </Wrapper> */}
      </Wrapper>
      
    </>
  );
};

export default ItineraryCard;
