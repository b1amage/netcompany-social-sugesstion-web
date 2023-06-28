import React, { useEffect, useState } from "react";
import Wrapper from "@/components/wrapper/Wrapper";
import Image from "@/components/image/Image";
import filter from "@/assets/filter.svg";
import Button from "@/components/button/Button";
import Popup from "@/components/popup/Popup";
import FilterContent from "./FilterContent";
import Heading from "@/components/typography/Heading";
import close from "@/assets/close.svg";
import { AiFillCheckCircle, AiOutlineClose } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";
import Dropdown from "@/components/form/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { changeCategory } from "@/features/filterSlice";

const Filter = ({ wrapperClassName, className, searchFilter, homeFilter }) => {
  const formatTime = (timeString) => {
    const hours = timeString.slice(0, 2);
    const minutes = timeString.slice(2, 4);

    return `${hours}:${minutes}`;
  };

  const {category} = useSelector(({filter}) => {
    return{
      category: filter.category
    }
  })
  const homeFilterList = [{title: "ALL"}, {title: "POPULAR"}, {title: "LATEST"}]
  const [locationListType, setLocationListType] = useState()
  const [searchParams, setSearchParams] = useSearchParams();
  const [isClicked, setIsClicked] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  const [searchDistanceValue, setSearchDistanceValue] = useState(null);

  const [categoryValue, setCategoryValue] = useState("");
  const [dayType, setDayType] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");

  const dispatch = useDispatch()
  useEffect(() => {
    setCategoryValue(searchParams.get("locationCategory") || "");
    setDayType(searchParams.get("dayType") || "");
    setOpenTime(
      searchParams.get("openFrom")
        ? formatTime(searchParams.get("openFrom"))
        : ""
    );
    setCloseTime(
      searchParams.get("closeTo") ? formatTime(searchParams.get("closeTo")) : ""
    );
    setSearchDistanceValue(
      searchParams.get("searchDistance")
        ? searchParams.get("searchDistance")
        : null
    );
    setLocationListType(searchParams.get('listType') ? {title: searchParams.get('listType')} : homeFilterList[0])
  }, [searchParams]);

  const handleCloseFilter = () => {
    // console.log("Clicked")
    // console.log(searchParams.get("locationCategory"));
    // console.log(searchParams.get("openFrom"));
    // console.log(searchParams.get("closeTo"));
    // console.log(searchParams.get("dayType"));
    // console.log(searchParams.get('searchDistance'))
    setCategoryValue(
      searchParams.get("locationCategory")
        ? {title: searchParams.get("locationCategory")}
        : ""
    );
    setOpenTime(
      searchParams.get("openFrom")
        ? formatTime(searchParams.get("openFrom"))
        : ""
    );
    setCloseTime(
      searchParams.get("closeTo") ? formatTime(searchParams.get("closeTo")) : ""
    );
    setDayType(searchParams.get("dayType") ? {title: searchParams.get("dayType")} : "");
    setSearchDistanceValue(
      searchParams.get("searchDistance")
        ? searchParams.get("searchDistance")
        : null
    );
    setIsClicked(false);
  };
  return (
    <Wrapper className={`w-full ${wrapperClassName}`}>
      {searchFilter && (
        <>
          <Button
            className={`hover:bg-gray-200/60 h-[60px] w-[60px] bg-transparent relative !p-1.5 !border-none ${className}`}
            onClick={() => setIsClicked(true)}
          >
            <Image
              imageClassName=""
              src={filter}
              alt="filter"
              className="w-[28px] h-[28px]"
            />
            {(categoryValue || (openTime && closeTime && dayType) || searchDistanceValue) && (
              <AiFillCheckCircle
                className={`text-black absolute bottom-2 left-1/2 translate-x-1/4`}
              />
            )}
          </Button>

          <Popup
            onClose={() => {}}
            actions={[]}
            children={
              <>
                <Wrapper
                  col="true"
                  className="w-full h-full gap-4 items-center"
                >
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
                    handleCloseFilter();
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
        </>
      )}
      {homeFilter && 
      <Dropdown 
        defaultTitle=""
        options={homeFilterList}
        value={locationListType}
        onChange={(option) => {
          setLocationListType(option);
          setSearchParams({listType: option.title})
          dispatch(changeCategory(option))
        }}
        // onClick={() => {
        //   setSearchParams({listType: locationListType.title})
        // }}
        className={`${
          locationListType?.title || locationListType
            && "ring-1 ring-black border-black"  
        } !w-[150px] ring-1 ring-black border-black`}
      />}
    </Wrapper>
  );
};

export default Filter;
