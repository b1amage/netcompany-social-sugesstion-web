import Input from "@/components/form/Input";
import React, { useEffect, useState } from "react";
import search from "@/assets/search.svg";
import Image from "@/components/image/Image";

import { useNavigate, useSearchParams } from "react-router-dom";
import ROUTE from "@/constants/routes";
const SearchBar = ({ className, wrapperClassName }) => {
  const [value, setValue] = useState();
  const [lastFetch, setLastFetch] = useState(Date.now());
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const now = Date.now();
      // Debounce: if less than 1000ms (1s) has passed since the last fetch, do nothing
      if (now - lastFetch < 1000) return;
      setLastFetch(now);
      // if (value.trim() === "") return;
      // dispatch(changeFiltering(true));
      navigate({
        pathname: ROUTE.SEARCH_LOCATION,
        search: `?searchInput=${value || ""}`,
      });
      // dispatch(changeFiltering(false));
    }
  };

  useEffect(() => {
    setValue(searchParams.get('searchInput') ? searchParams.get('searchInput') : "")
  }, [searchParams])
  
  return (
    <div className={`w-full relative ${wrapperClassName}`}>
      <Input
        placeholder="Search"
        className={`bg-white h-[60px] focus:ring-primary-400 focus:ring-1 border-primary-400 !pr-12 ${className}`}
        // icon={search}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />

      <Image
        src={search}
        alt="search"
        className={`absolute w-[24px] h-[24px] top-1/2 right-4 -translate-y-1/2 `}
        onClick={() => {
          // dispatch(changeFiltering(true));
          // dispatch(changeSearchInput(value));
          const now = Date.now();
          // Debounce: if less than 1000ms (1s) has passed since the last fetch, do nothing
          if (now - lastFetch < 1000) return;
          setLastFetch(now);
          navigate({
            pathname: ROUTE.SEARCH_LOCATION,
            search: `?searchInput=${value || ""}`,
          });
          // dispatch(changeFiltering(false));
        }}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default SearchBar;
