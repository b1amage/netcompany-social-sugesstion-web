import Screen from "@/components/container/Screen";
import SubNavbar from "@/components/navbar/SubNavbar";
import Filter from "@/components/filter/Filter";
import SearchBar from "@/components/search/SearchBar";
import Wrapper from "@/components/wrapper/Wrapper";

import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useCurrentLocation from "@/hooks/useCurrentLocation";
import Heading from "@/components/typography/Heading";
import locationApi from "@/api/locationApi";
import ProfileCard from "@/components/card/ProfileCard";
import Loading from "@/components/loading/Loading";

const SearchLocationScreen = () => {
  // useCurrentLocation()
  const { user } = useSelector((state) => state.user);
  const [locations, setLocations] = useState([]);
  const [nextCursor, setNextCursor] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [lastFetch, setLastFetch] = useState(Date.now());

  const {
    latitude,
    longitude,
    category,
    time,
    searchDistance,
    searchInput,
    isFiltering,
  } = useSelector(({ currentLocation, filter }) => {
    return {
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      category: filter.category,
      searchInput: filter.searchInput,
      searchDistance: filter.searchDistance,
      time: filter.time,
      isFiltering: filter.isFiltering,
    };
  });

  useEffect(() => {
    if (latitude && longitude) {
      // if (currentLocation) {
      setIsLoading(true);
      const fetchLocations = async () => {
        const response = await locationApi.getFeaturedLocation({
          locationCategory: category.title,
          searchInput: searchInput,
          lat: latitude,
          lng: longitude,
          searchDistance: searchDistance,
          weekday:
            time?.dayType?.title === "Weekday" &&
            time?.openFrom !== "" &&
            time?.closeTo !== ""
              ? {
                  openTime: time?.openFrom,
                  closeTime: time?.closeTo,
                }
              : null,
          weekend:
            time?.dayType?.title === "Weekend" &&
            time?.openFrom !== "" &&
            time?.closeTo !== ""
              ? {
                  openTime: time?.openFrom,
                  closeTime: time?.closeTo,
                }
              : null,
        });
        setLocations(response.data.results);
        localStorage.setItem("nextCursor", response.data.next_cursor);
        setNextCursor(response.data.next_cursor);
        setIsLoading(false);
      };
      fetchLocations();
    }
  }, [
    // currentLocation,
    latitude,
    longitude,
    category,
    searchInput,
    time,
    searchDistance,
  ]);

  const handleLoadMoreData = (nextCursor) => {
    const now = Date.now();

    // Debounce: if less than 1000ms (1s) has passed since the last fetch, do nothing
    if (now - lastFetch < 1000) return;
    if (nextCursor === null) return;
    setLastFetch(now);

    const fetchLocations = async () => {
      const response = await locationApi.getFeaturedLocation(
        {
          locationCategory: category.title,
          searchInput: searchInput,
          lat: latitude,
          lng: longitude,
          searchDistance: searchDistance,
          weekday:
            time?.dayType?.title === "Weekday" &&
            time?.openFrom !== "" &&
            time?.closeTo !== ""
              ? {
                  openTime: time?.openFrom,
                  closeTime: time?.closeTo,
                }
              : null,
          weekend:
            time?.dayType?.title === "Weekend" &&
            time?.openFrom !== "" &&
            time?.closeTo !== ""
              ? {
                  openTime: time?.openFrom,
                  closeTime: time?.closeTo,
                }
              : null,
        },
        nextCursor
      );
      setLocations((prev) => [...prev, ...response.data.results]);
      localStorage.setItem("nextCursor", response.data.next_cursor);
      setNextCursor(response.data.next_cursor);
    };
    fetchLocations();
  };

  const tabRef = useRef();

  useEffect(() => {
    const handleScroll = async () => {
      if (!tabRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = tabRef.current;
      const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight;

      if (isScrolledToBottom) {
        console.log("Scrolled to bottom!");
        const nextCursor = localStorage.getItem("nextCursor");
        if (nextCursor.length > 10) {
          handleLoadMoreData(nextCursor);
        }
      }
    };

    tabRef.current.addEventListener("scroll", handleScroll);

    return () => {
      if (tabRef.current) {
        // Remember to remove event listener when the component is unmounted
        tabRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [tabRef.current]);
  return (
    <Screen className="flex flex-col gap-4 px-3 py-4 lg:gap-8 md:px-6 md:py-5 lg:px-20 !h-screen !overflow-hidden !min-h-0">
      <SubNavbar user={user} canSearching/>
      <Heading className="text-black/40">
        Results for <span className="text-primary-400">"{searchInput}"</span>
      </Heading>
      {isFiltering ? (
        <Wrapper className="h-full items-center !justify-center">
          <Loading className="w-[60px] h-[60px]" />
        </Wrapper>
      ) : (
        <Wrapper
          _ref={tabRef}
          className="flex-wrap gap-4 overflow-y-scroll justify-evenly sm:justify-normal"
        >
          {locations.length > 0 ? (
            locations.map((location) => {
              return (
                <ProfileCard
                  key={location._id}
                  place={{
                    _id: location._id,
                    imageUrls: location.imageUrls,
                    name: location.name,
                    address: location.address,
                    // description: location.description,
                  }}
                  className="w-[200px] sm:w-[300px] md:w-[350px] lg:w-[420px] xl:w-[360px] !max-w-none"
                />
              );
            })
          ) : (
            <Wrapper className="justify-center">
              <Heading>No results found!</Heading>
            </Wrapper>
          )}
        </Wrapper>
      )}
    </Screen>
  );
};

export default SearchLocationScreen;
