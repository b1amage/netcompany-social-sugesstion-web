import React, { useEffect, useState } from "react";
import add from "@/assets/add.svg";
import Image from "@/components/image/Image";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "@/components/wrapper/Wrapper";
import { validatePathname } from "@/features/navbarSlice";
import Filter from "@/components/filter/Filter";
import Popup from "@/components/popup/Popup";
import {
  changeCurrentLocation,
  changeLatitude,
  changeLongitude,
} from "@/features/currentLocationSlice";
import AutoCompleteScreen from "@/test/AutoComplete";
import { AiOutlineArrowLeft } from "react-icons/ai";
import locationImg from "@/assets/location.svg";
import Heading from "@/components/typography/Heading";
import User from "@/components/user/User";
import SearchBar from "@/components/search/SearchBar";
import Button from "@/components/button/Button";
import { useNavigate } from "react-router-dom";
import useViewport from "@/hooks/useScreenWidth";

const SubNavbar = ({ user, homeFilter, searchFilter, searchBar, wrapperClassName, displayAddress, onClear }) => {
  const dispatch = useDispatch();
  const { isAdded, isShowFilter, currentLocation } = useSelector(
    ({ navbar, currentLocation }) => {
      return {
        isAdded: navbar.isAdded,
        isShowFilter: navbar.isShowFilter,
        currentLocation: currentLocation.currentLocation,
      };
    }
  );

  const { width } = useViewport();
  const navigate = useNavigate();
  const [address, setAddress] = useState();
  const [showAutoComplete, setShowAutoComplete] = useState(false);


  const onChangeCurrentLocation = (location, latitude, longitude) => {
    localStorage.setItem("currentLocation", JSON.stringify(location));
    localStorage.setItem("gpsPermission", "denied");
    dispatch(changeCurrentLocation(location));
    dispatch(changeLatitude(latitude));
    dispatch(changeLongitude(longitude));
    setShowAutoComplete(false);
  };

  useEffect(() => {
    dispatch(validatePathname(window.location.pathname));
  }, [window.location.pathname]);
  return (
    <>
      <Wrapper col="true" className={`w-full gap-4 ${wrapperClassName}`}>
        <Wrapper
          col="true"
          className="md:flex-row justify-between md:items-center gap-4 truncate"
        >
          <User user={user} src={user.imageUrl} />
          {displayAddress && 
          <Wrapper
            className="flex items-center h-[60px] cursor-pointer hover:bg-gray-200/60 px-3 duration-300 rounded-lg truncate"
            onClick={() => setShowAutoComplete(true)}
          >
            <Image
              src={locationImg}
              alt="location"
              className="md:w-[35px]"
              imageClassName="md:w-[28px] md:h-[28px]"
            />
            <Heading className="!text-[14px] w-fit truncate ">
              {!localStorage.getItem("isGetCurrentLocation") ? "...Loading"
                  : (currentLocation) ? currentLocation.formatted_address 
                : !localStorage.getItem("currentLocation")
                ? "Enter a location"
                : JSON.parse(localStorage.getItem("currentLocation"))
                    .formatted_address}
            </Heading>
          </Wrapper>}
        </Wrapper>

        <Wrapper className="gap-1 items-end md:!gap-2 lg:!gap-3">
          {isAdded && (
            <Button
              onClick={() => {
                navigate("/create-location");
              }}
              // active
              className="md:!w-[450px] !my-0 md:!rounded-2xl !p-4 md:!px-1 flex justify-center gap-2 h-[60px] !rounded-full !fixed md:!static z-[4000] right-4  bottom-4 !bg-secondary-400 md:!bg-primary-400 md:!border-primary-400 border-secondary-400"
            >
              <Image
                imageClassName=""
                src={add}
                alt="add"
                className="w-[28px] h-[28px]"
              />
              <Heading className="md:block text-white hidden !text-[20px]">
                Register new location
              </Heading>
            </Button>
          )}
          {searchBar && <SearchBar onClear={onClear} className="w-full" />}
          {isShowFilter && (
            <Wrapper className="items-center w-fit justify-end gap-4">
              <Filter
                homeFilter={homeFilter}
                searchFilter={searchFilter}
                wrapperClassName=""
                className="m-0"
              />
            </Wrapper>
          )}
        </Wrapper>

        
      </Wrapper>
      {showAutoComplete && <Popup
          onClose={() => {}}
          actions={[]}
          children={
            <>
              {width >= 768 && (
                <Heading className="text-center">Set current location</Heading>
              )}
              <Wrapper className="!w-full">
                <AiOutlineArrowLeft
                  className="h-full w-[60px] cursor-pointer "
                  onClick={() => setShowAutoComplete(false)}
                />

                <AutoCompleteScreen
                  className={`!h-[60px] !py-2`}
                  onChange={onChangeCurrentLocation}
                  setAddress={setAddress}
                />
              </Wrapper>
            </>
          }
          className={`${
            showAutoComplete ? "translate-x-0" : "translate-x-full"
          } duration-500 `}
          formClassName="items-center h-full w-full !rounded-none md:!py-2 md:!px-4 md:!rounded-lg"
          titleClassName="text-[20px]"
          childrenClassName="!mt-0 w-full flex-col"
        />}
    </>
  );
};

export default SubNavbar;
