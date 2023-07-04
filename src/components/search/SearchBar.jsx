import Input from "@/components/form/Input";
import React, { useEffect, useState } from "react";
import search from "@/assets/search.svg";
import Image from "@/components/image/Image";

import { useNavigate, useSearchParams } from "react-router-dom";
import ROUTE from "@/constants/routes";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import InputWithDropdown from "@/components/form/InputWithDropdown";
import { GoLocation } from "react-icons/go";
import eventApi from "@/api/eventApi";
const SearchBar = ({ className, wrapperClassName }) => {
  const [value, setValue] = useState();
  const [lastFetch, setLastFetch] = useState(Date.now());
  const [searchParams, setSearchParams] = useSearchParams();
  const [suggestNextCursor, setSuggestNextCursor] = useState();
  const [event, setEvent] = useState();


  const navigate = useNavigate();

  const { currentLocation } = useSelector(({ filter, currentLocation }) => {
    return {
      currentLocation: currentLocation.currentLocation,
      // latitude: currentLocation.latitude,
      // longitude: currentLocation.longitude,
      // category: filter.category,
    };
  });
  const handleKeyPress = (value) => {
    // if (event.key === "Enter") {
      const now = Date.now();
      // Debounce: if less than 1000ms (1s) has passed since the last fetch, do nothing
      if (now - lastFetch < 1000) return;
      setLastFetch(now);
      // if (value.trim() === "") return;
      // dispatch(changeFiltering(true));

      if (!currentLocation && !localStorage.getItem("currentLocation")) {
        toast.error("Please enter your current location!");
        return;
      }
      navigate({
        pathname: ROUTE.SEARCH_LOCATION,
        search: `?searchInput=${value || ""}`,
      });
      // dispatch(changeFiltering(false));
    // }
  };

  useEffect(() => {
    setValue(
      searchParams.get("searchInput") ? searchParams.get("searchInput") : ""
    );
  }, [searchParams]);

  const handleGetLocationSuggestList = (text) => {
    const apiHandler = async () => {
      const response = await eventApi.getSuggestLocation(text);
      setSuggestNextCursor(response.data.next_cursor);
      return response.data;
    };

    return apiHandler();
  };

  const handlePlaceSelect = (location) => {
    // const newEvent = { ...event, locationId: location._id };
    // setEvent(newEvent);
    navigate(`/location/details/${location._id}`)
  };

  const handleLoadmoreSuggestList = (text) => {
    const apiHandler = async () => {
      if (suggestNextCursor === null) return null;
      const response = await eventApi.getSuggestLocation(
        text,
        suggestNextCursor
      );
      setSuggestNextCursor(response.data.next_cursor);
      return response.data;
    };

    return apiHandler();
  };


  return (
    <div className={`w-full relative ${wrapperClassName}`}>
      {/* <Input
        placeholder="Search"
        className={`bg-white h-[60px] focus:ring-primary-400 focus:ring-1 border-primary-400 !pr-12 ${className}`}
        // icon={search}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleKeyPress}
      /> */}
      <InputWithDropdown
        handleGet={handleGetLocationSuggestList}
        placeholder="Select location"
        onSelect={handlePlaceSelect}
        loadMore={handleLoadmoreSuggestList}
        fieldToDisplay="name"
        subFieldToDisplay="address"
        icon={<GoLocation />}
        inputClassName="!h-[60px] !rounded-2xl"
        wrapperClassName="md:!gap-0 lg:!gap-0 !gap-0"
        hideError
        onEnter={handleKeyPress}
        // onChange={e => setValue(e.target.value)}
      />
      {/* <Image
        src={search}
        alt="search"
        className={`absolute w-[24px] h-[24px] top-1/2 right-4 -translate-y-1/2 `}
        onClick={(e) => {
          // dispatch(changeFiltering(true));
          // dispatch(changeSearchInput(value));
          e.preventDefault()
          const now = Date.now();
          // Debounce: if less than 1000ms (1s) has passed since the last fetch, do nothing
          if (now - lastFetch < 1000) return;
          setLastFetch(now);
          if (!currentLocation) {
            toast.error("Please enter your current location!");
            return;
          }
          navigate({
            pathname: ROUTE.SEARCH_LOCATION,
            search: `?searchInput=${value || ""}`,
          });
          // dispatch(changeFiltering(false));
        }}
        // onKeyPress={handleKeyPress}
      /> */}
    </div>
  );
};

export default SearchBar;
