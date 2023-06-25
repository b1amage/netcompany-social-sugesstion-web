import React, { useState } from "react";
import Wrapper from "@/components/wrapper/Wrapper";
import Image from "@/components/image/Image";
import filter from "@/assets/filter.svg";
import Button from "@/components/button/Button";
import Popup from "@/components/popup/Popup";
import FilterContent from "./FilterContent";
import Heading from "@/components/typography/Heading";
import close from "@/assets/close.svg";
import { AiFillCheckCircle, AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";

const Filter = ({ wrapperClassName, className }) => {
  const formatTime = (timeString) => {
    const hours = timeString.slice(0, 2);
    const minutes = timeString.slice(2, 4);

    return `${hours}:${minutes}`;
  };

  const [isClicked, setIsClicked] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false)
  const { category, time, searchDistance } = useSelector(({ filter }) => {
    return {
      category: filter.category,
      searchDistance: filter.searchDistance,
      time: filter.time,
    };
  });

  const [categoryValue, setCategoryValue] = useState(category);
  const [dayType, setDayType] = useState(time?.dayType);
  const [openTime, setOpenTime] = useState(time?.openFrom);
  const [closeTime, setCloseTime] = useState(time?.closeTo);
  const [searchDistanceValue, setSearchDistanceValue] = useState(
    searchDistance || 5
  );
  

  const handleCloseFilter= () => {
    setCategoryValue(category)
    setOpenTime(time?.openFrom !== "" ? formatTime(time?.openFrom) : "")
    setCloseTime(time?.closeTo !== "" ? formatTime(time?.closeTo) : "")
    setDayType(time?.dayType)
    setSearchDistanceValue(searchDistance || 5)
    // console.log("Clicked")
    setIsClicked(false)
  }
  return (
    <Wrapper className={`w-full ${wrapperClassName}`}>
      <Button
        className={`!bg-transparent relative !p-1.5 !border-none ${className}`}
        onClick={() => setIsClicked(true)}
      >
        <Image
          imageClassName=""
          src={filter}
          alt="filter"
          className="w-[28px] h-[28px]"
        />
        {isFiltered && <AiFillCheckCircle className={`text-black absolute bottom-0 right-0 `} />}
      </Button>

      <Popup
        onClose={() => handleCloseFilter()}
        actions={[]}
        children={
          <>
            <Wrapper col="true" className="w-full h-full gap-4 items-center">
              <Heading className="text-center !text-[36px]">Filter</Heading>
              <FilterContent
                setIsFiltered={setIsFiltered}
                setIsClicked={setIsClicked}
                categoryValue={categoryValue}
                setCategoryValue={setCategoryValue}
                dayType={dayType}
                setDayType={setDayType}
                openTime={openTime}
                setOpenTime={setOpenTime}
                closeTime={closeTime}
                setCloseTime={setCloseTime}
                searchDistanceValue={searchDistanceValue}
                setSearchDistanceValue={setSearchDistanceValue}
              />
            </Wrapper>
            <Button
              className="!absolute top-0 right-0 !bg-transparent !rounded-none !border-none !my-0"
              onClick={() => {
                handleCloseFilter()
              }}
            >
              <AiOutlineClose className="text-[32px]  text-black " />
            </Button>
          </>
        }
        className={`${
          isClicked ? "translate-y-0" : "translate-y-full"
        } duration-300 items-center  `}
        formClassName="overflow-y-scroll justify-center  !h-[600px] md:!h-[650px] !py-0 !px-4 "
        // overflow-hidden justify-center items-end md:items-center 2xl:!py-16
        // overflow-y-scroll !h-auto w-full justify-center md:p-0 md:px-2 !rounded-b-none rounded-t-xl md:!rounded-2xl md:py-0
        titleClassName="text-[20px]"
        childrenClassName="!mt-0 w-full"
        // setShowPopup={setShowAutoComplete}
      />
    </Wrapper>
  );
};

export default Filter;
