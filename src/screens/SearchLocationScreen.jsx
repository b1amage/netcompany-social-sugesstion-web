import Screen from "@/components/container/Screen";
import SubNavbar from "@/components/navbar/SubNavbar";
import Wrapper from "@/components/wrapper/Wrapper";

import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Heading from "@/components/typography/Heading";
import locationApi from "@/api/locationApi";
import ProfileCard from "@/components/card/ProfileCard";
import Loading from "@/components/loading/Loading";
import { useSearchParams } from "react-router-dom";

const SearchLocationScreen = () => {
  // useCurrentLocation()
  const { user } = useSelector((state) => state.user);
  const [locations, setLocations] = useState([]);
  const [nextCursor, setNextCursor] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [lastFetch, setLastFetch] = useState(Date.now());
  const [isFeaturedUpdating, setIsFeaturedUpdating] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const [resettingScroll, setResettingScroll] = useState(false);
  const tabRef = useRef();

  const { latitude, longitude } = useSelector(({ currentLocation, filter }) => {
    return {
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
    };
  });

  useEffect(() => {
    if (latitude && longitude) {
      // if (currentLocation) {
      const fetchLocations = async () => {
        const response = await locationApi.getFeaturedLocation({
          locationCategory:
            searchParams.get("locationCategory") === ""
              ? null
              : searchParams.get("locationCategory"),
          searchInput: searchParams.get("searchInput"),
          lat: latitude,
          lng: longitude,
          searchDistance: searchParams.get("searchDistance") !== "" ?  searchParams.get("searchDistance") : null,
          weekday:
            searchParams.get("dayType") === "Weekday" &&
            searchParams.get("openFrom") !== "" &&
            searchParams.get("closeTo") !== ""
              ? {
                  openTime: searchParams.get("openFrom"),
                  closeTime: searchParams.get("closeTo"),
                }
              : null,
          weekend:
            searchParams.get("dayType") === "Weekend" &&
            searchParams.get("openFrom") !== "" &&
            searchParams.get("closeTo") !== ""
              ? {
                  openTime: searchParams.get("openFrom"),
                  closeTime: searchParams.get("closeTo"),
                }
              : null,
        });
        localStorage.setItem("searchLocations", JSON.stringify(response.data.results))
        setLocations(response.data.results);

        localStorage.setItem("nextCursor", response.data.next_cursor);
        setNextCursor(response.data.next_cursor);
        setIsLoading(false);
      };
      fetchLocations();
    }
  }, [latitude, longitude, searchParams]);

  useEffect(() => {
    const handlePopState = () => {
      window.location.reload();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const loadMoreData = async (nextCursor) => {
    const now = Date.now();

    // Debounce: if less than 1000ms (1s) has passed since the last fetch, do nothing
    if (now - lastFetch < 1000) return;
    if (nextCursor === null) return;
    
    setLastFetch(now);
    // setIsFeaturedUpdating(true)
    // const fetchLocations = async () => {
      // setIsFeaturedUpdating(true)
    const response = await locationApi.getFeaturedLocation(
      {
        locationCategory:
          searchParams.get("locationCategory") === ""
            ? null
            : searchParams.get("locationCategory"),
        searchInput: searchParams.get("searchInput"),
        lat: latitude,
        lng: longitude,
        searchDistance: searchParams.get("searchDistance") !== "" ? searchParams.get("searchDistance") : null,
        weekday:
          searchParams.get("dayType") === "Weekday" &&
          searchParams.get("openFrom") !== "" &&
          searchParams.get("closeTo") !== ""
            ? {
                openTime: searchParams.get("openFrom"),
                closeTime: searchParams.get("closeTo"),
              }
            : null,
        weekend:
          searchParams.get("dayType") === "Weekend" &&
          searchParams.get("openFrom") !== "" &&
          searchParams.get("closeTo") !== ""
            ? {
                openTime: searchParams.get("openFrom"),
                closeTime: searchParams.get("closeTo"),
              }
            : null,
      },
      nextCursor
    );
    const newPlaces = [
      ...JSON.parse(localStorage.getItem("searchLocations")),
      ...response.data.results,
    ];
    localStorage.setItem("searchLocations", JSON.stringify(newPlaces))
    setLocations((prev) => [...prev, ...response.data.results]);
    localStorage.setItem("nextCursor", response.data.next_cursor);
    setNextCursor(response.data.next_cursor);
    // setTimeout(() => {
    //   setIsFeaturedUpdating(false)
    // }, 2000)
    //   setIsFeaturedUpdating(false)
    // };
    // fetchLocations();
  };

  useEffect(() => {
    if (resettingScroll) {
      setResettingScroll(false);
      return;
    }

    if (!tabRef.current) return;
    const handleScroll = async () => {
      const { scrollTop, scrollHeight, clientHeight } = tabRef.current;
      const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight;
      
      if (isScrolledToBottom) {
        console.log("Scrolled to bottom!");
        const nextCursor = localStorage.getItem("nextCursor");
        // if (nextCursor.length > 10) {
        // }
       
        await loadMoreData(nextCursor);

        // if (!isFeaturedUpdating){
        // } 
      }
    };

    tabRef.current.addEventListener("scroll", handleScroll);
    // console.log(tabRef.current)
    return () => {
      if (tabRef.current) {
        // Remember to remove event listener when the component is unmounted
        tabRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loadMoreData]);

  useEffect(() => {
    if (tabRef.current) {
      setResettingScroll(true);
      tabRef.current.scrollTop = 0;
    }
  }, [searchParams]);

  return (
    <Screen className="flex flex-col gap-4 px-3 py-4 lg:gap-8 md:px-6 md:py-5 lg:px-20 !h-screen !overflow-hidden !min-h-0">
      <SubNavbar user={user} searchFilter/>
      {searchParams.get("searchInput") !== "" ? (
        locations.length > 0 ? (
          <Heading className="text-black/40 !text-[24px] md:!text-[32px]">
            Results for{" "}
            <span className="text-primary-400">
              "{searchParams.get("searchInput")}"
            </span>
          </Heading>
        ) : (
          <Heading className="text-primary-400 !text-[24px] md:!text-[32px]">
            No results found for{" "}
            <span className="text-primary-400">
              "{searchParams.get("searchInput")}"
            </span>
          </Heading>
        )
      ) : (
        <Heading className="text-primary-400 !text-[24px] md:!text-[32px]">
          Show all results
        </Heading>
      )}
      {isLoading ? (
        <Wrapper className="h-full items-center !justify-center">
          <Loading className="w-[60px] h-[60px]" />
        </Wrapper>
      ) : (
        locations.length > 0 && (
          <Wrapper
            _ref={tabRef}
            className="flex-wrap gap-4 overflow-y-scroll"
          >
            {locations.map((location) => {
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
                  className="w-[220px] sm:w-[300px] md:w-[350px] lg:w-[420px] xl:w-[360px] !h-[400px] !max-w-none"
                />
              );
            })}
          </Wrapper>
        )
      )}
    </Screen>
  );
};

export default SearchLocationScreen;
