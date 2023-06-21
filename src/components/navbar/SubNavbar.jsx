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
import { changeSearchInput } from "@/features/filterSlice";
import Button from "@/components/button/Button";
import { useNavigate } from "react-router-dom";

const SubNavbar = ({ user }) => {
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

  const navigate = useNavigate()
  const [address, setAddress] = useState();
  const [showAutoComplete, setShowAutoComplete] = useState(false);

  const { isGetCurrentLocation, isTurnOnGPS } = useCurrentLocation();

  const onChangeCurrentLocation = (location, latitude, longitude) => {
    localStorage.setItem("currentLocation", JSON.stringify(location));
    dispatch(changeCurrentLocation(location));
    dispatch(changeLatitude(latitude));
    dispatch(changeLongitude(longitude));
    setShowAutoComplete(false);
  };

  const handleSearchValue = (value) => {
    if (value.trim() === "") return;
    dispatch(changeSearchInput(value));
  };

  useEffect(() => {
    dispatch(validatePathname(window.location.pathname));
  }, [window.location.pathname]);
  return (
    <Wrapper col="true" className="w-full gap-4">
      <Wrapper col="true" className="md:flex-row gap-4 truncate">
        <User user={user} src={user.imageUrl} />
        <Wrapper
          className="flex items-center"
          onClick={() => setShowAutoComplete(true)}
        >
          <Image
            src={locationImg}
            alt="location"
            className=""
            imageClassName="md:w-[28px] md:h-[28px]"
          />
          <Heading className="!text-[14px] w-fit truncate ">
            {isTurnOnGPS
              ? (isGetCurrentLocation 
                ? "...Loading" 
                : currentLocation.formatted_address)
              : !localStorage.getItem("currentLocation")
              ? "Enter a location"
              : JSON.parse(localStorage.getItem("currentLocation"))
                  .formatted_address}
          </Heading>
        </Wrapper>
      </Wrapper>

      <Wrapper className="gap-4 items-center">
        <SearchBar onChange={handleSearchValue} className="w-full" />
        <Wrapper className="items-center w-fit justify-end gap-4">
          {isAdded && (
            <Button className="!bg-transparent !p-0 !border-none">
              <Image
                imageClassName=""
                src={add}
                alt="add"
                className="w-[28px] h-[28px]"
                onClick={() => {
                  if (window.location.pathname === "/")
                    navigate("/create-location");
                }}
              />
            </Button>
          )}
          {isShowFilter && <Filter wrapperClassName="" className="m-0" />}
        </Wrapper>
      </Wrapper>

      <Popup
        onClose={() => {}}
        actions={[]}
        // title="Search location"
        children={
          <>
            <AiOutlineArrowLeft
              className="h-full w-[40px]"
              onClick={() => setShowAutoComplete(false)}
            />

            <AutoCompleteScreen
              // label="Location"
              className={`h-[50px] !py-2`}
              // address={currentLocation && currentLocation.formatted_address}
              onChange={onChangeCurrentLocation}
              setAddress={setAddress}
              // addressErr={addressErr}
            />
          </>
        }
        className={`${
          showAutoComplete ? "translate-x-0" : "translate-x-full"
        } duration-300`}
        formClassName="items-center animate-zoom h-full w-full !rounded-none !py-0"
        titleClassName="text-[20px]"
        childrenClassName="!mt-0 w-full "
        // setShowPopup={setShowAutoComplete}
      />
    </Wrapper>
  );
};

export default SubNavbar;
