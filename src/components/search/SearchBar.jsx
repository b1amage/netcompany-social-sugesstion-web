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
  const [hideSuggestions, setHideSuggestions] = useState(true);

  const navigate = useNavigate();

  const { currentLocation } = useSelector(({ filter, currentLocation }) => {
    return {
      currentLocation: currentLocation.currentLocation,
    };
  });
  const handleKeyPress = (value) => {
      const now = Date.now();
      // Debounce: if less than 1000ms (1s) has passed since the last fetch, do nothing
      if (now - lastFetch < 1000) return;
      setLastFetch(now);
      if (!currentLocation && !localStorage.getItem("currentLocation")) {
        toast.error("Please enter your current location!");
        return;
      }
      navigate({
        pathname: ROUTE.SEARCH_LOCATION,
        search: `?searchInput=${value || ""}`,
      });
      setHideSuggestions(true)
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
      <InputWithDropdown
        handleGet={handleGetLocationSuggestList}
        placeholder="Select location"
        onSelect={handlePlaceSelect}
        loadMore={handleLoadmoreSuggestList}
        fieldToDisplay="name"
        subFieldToDisplay="address"
        icon={<GoLocation />}
        inputClassName="!h-[60px] !rounded-2xl"
        wrapperClassName=""
        hideError="true"
        onClear={() => {}}
        onEnter={handleKeyPress}
        searchQuery={searchParams.get("searchInput")}
        dropdownClassName="!z-[8500]"
        withClearButton="true"
        onChange={() => setHideSuggestions(false)}
        hideSuggestions={hideSuggestions}
      />
    </div>
  );
};

export default SearchBar;
