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
import useCurrentLocation from "@/hooks/useCurrentLocation";
import locationImg from "@/assets/location.svg";
import Heading from "@/components/typography/Heading";
import User from "@/components/user/User";
import SearchBar from "@/components/search/SearchBar";
import { FaSearch } from "react-icons/fa";
import Button from "@/components/button/Button";
import { useNavigate } from "react-router-dom";
import useViewport from "@/hooks/useScreenWidth";
import ROUTE from "@/constants/routes";

const SubNavbar = ({ user, homeFilter, searchFilter }) => {
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
      <Wrapper col="true" className="w-full gap-4">
        <Wrapper
          col="true"
          className="md:flex-row justify-between gap-4 truncate"
        >
          <User user={user} src={user.imageUrl} />
          <Wrapper
            className="flex items-center cursor-pointer hover:bg-gray-200/60 px-3 duration-300 rounded-lg"
            onClick={() => setShowAutoComplete(true)}
          >
            <Image
              src={locationImg}
              alt="location"
              className=""
              imageClassName="md:w-[28px] md:h-[28px]"
            />
            <Heading className="!text-[14px] w-fit truncate ">
              {currentLocation
                  ? currentLocation.formatted_address
                : !localStorage.getItem("currentLocation")
                ? "Enter a location"
                : JSON.parse(localStorage.getItem("currentLocation"))
                    .formatted_address}
            </Heading>
          </Wrapper>
        </Wrapper>

        <Wrapper className="gap-4 items-center">
          {isAdded && (
            <Button
              onClick={() => {
                navigate("/create-location");
              }}
              active
              className="md:!w-[400px] flex justify-evenly gap-2 h-[60px] !rounded-2xl !fixed md:!static z-[4000] right-4 !w-[250px] bottom-4 border-primary-400"
            >
              <Image
                imageClassName=""
                src={add}
                alt="add"
                className="w-[28px] h-[28px]"
              />
              Register new location
            </Button>
          )}
          <SearchBar className="w-full" />
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

        <Popup
          onClose={() => {}}
          actions={[]}
          // title="Search location"
          children={
            <>
              {width >= 768 && (
                <Heading className="text-center">Set current location</Heading>
              )}
              <Wrapper>
                <AiOutlineArrowLeft
                  className="h-full w-[60px] cursor-pointer "
                  onClick={() => setShowAutoComplete(false)}
                />

                <AutoCompleteScreen
                  // label="Location"
                  className={`!h-[60px] !py-2`}
                  // address={currentLocation && currentLocation.formatted_address}
                  onChange={onChangeCurrentLocation}
                  setAddress={setAddress}
                  // addressErr={addressErr}
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
          // setShowPopup={setShowAutoComplete}
        />
      </Wrapper>
    </>
  );
};

export default SubNavbar;
