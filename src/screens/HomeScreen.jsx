import localStorageKey from "@/constants/localStorageKeys";
import ROUTE from "@/constants/routes";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Wrapper from "@/components/wrapper/Wrapper";

import Heading from "@/components/typography/Heading";
import locationApi from "@/api/locationApi";
import Slider from "@/components/slider/Slider";
import Label from "@/components/form/Label";
import Loading from "@/components/loading/Loading";

import OnBoardingSlider from "@/components/slider/OnBoardingSlider";
import Screen from "@/components/container/Screen";

import SubNavbar from "@/components/navbar/SubNavbar";
import useCurrentLocation from "@/hooks/useCurrentLocation";

// const key = import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY;

const HomeScreen = () => {
  const navigate = useNavigate();
  const [featuredLocations, setFeaturedLocations] = useState([]);
  const [latestLocations, setLatestLocations] = useState([]);
  const [featuredNextCursor, setFeaturedNextCursor] = useState();
  const [latestNextCursor, setLatestNextCursor] = useState();
  const [isFeaturedUpdating, setIsFeaturedUpdating] = useState(false);
  const [isLatestUpdating, setIsLatestUpdating] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { isGetCurrentLocation } = useCurrentLocation();
  const dispatch = useDispatch();

  const [lastFetch, setLastFetch] = useState(Date.now());

  const { latitude, longitude, currentLocation } = useSelector(
    ({ filter, currentLocation }) => {
      return {
        currentLocation: currentLocation.currentLocation,
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        category: filter.category,
      };
    }
  );

  const onSelectLocation = (id) => {
    navigate(id);
  };

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (localStorage.getItem("loginReload") === "true") {
      localStorage.setItem("loginReload", "false");
      location.reload();
    }

    const user =
      localStorage.getItem(localStorageKey.user) || JSON.stringify({});
    if (user === JSON.stringify({})) {
      navigate(ROUTE.LOGIN);
    }
  }, []);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    console.log(isGetCurrentLocation);
    console.log(currentLocation);
  }, [isGetCurrentLocation, currentLocation]);
  useEffect(() => {
    if (latitude && longitude) {
      // if (currentLocation) {
      setIsLoading(true);
      const fetchFeaturedLocations = async () => {
        const response = await locationApi.getFeaturedLocation({
          locationCategory: searchParams.get("locationCategory"),
          searchInput: searchParams.get("searchInput"),
          lat: latitude,
          lng: longitude,
          searchDistance: searchParams.get("searchDistance"),
          weekday:
            searchParams.get("dayType") === "Weekday"
              ? {
                  openTime: searchParams.get("openFrom"),
                  closeTime: searchParams.get("closeTo"),
                }
              : null,
          weekend:
            searchParams.get("dayType") === "Weekend"
              ? {
                  openTime: searchParams.get("openFrom"),
                  closeTime: searchParams.get("closeTo"),
                }
              : null,
        });
        setFeaturedLocations(response.data.results);
        localStorage.setItem("featuredNextCursor", response.data.next_cursor);
        setFeaturedNextCursor(response.data.next_cursor);
        setIsLoading(false);
      };
      fetchFeaturedLocations();
    }
  }, [latitude, longitude, searchParams]);

  useEffect(() => {
    // console.log(searchParams.get("locationCategory"));
    // console.log(searchParams.get("openFrom"));
    // console.log(searchParams.get("closeTo"));
    // console.log(searchParams.get("dayType"));
    if (latitude && longitude) {
      const fetchLatestLocations = async () => {
        const response = await locationApi.getLatestLocation({
          locationCategory: searchParams.get("locationCategory"),
          searchInput: searchParams.get("searchInput"),
          lat: latitude,
          lng: longitude,
          searchDistance: searchParams.get("searchDistance"),
          weekday:
            searchParams.get("dayType") === "Weekday"
              ? {
                  openTime: searchParams.get("openFrom"),
                  closeTime: searchParams.get("closeTo"),
                }
              : null,
          weekend:
            searchParams.get("dayType") === "Weekend"
              ? {
                  openTime: searchParams.get("openFrom"),
                  closeTime: searchParams.get("closeTo"),
                }
              : null,
        });
        setLatestLocations(response.data.results);
        localStorage.setItem("latestNextCursor", response.data.next_cursor);
        setLatestNextCursor(response.data.next_cursor);
        setIsLoading(false);
      };
      fetchLatestLocations();
    }
    console.log(featuredNextCursor);
    console.log(latestNextCursor);
  }, [
    // currentLocation,
    latitude,
    longitude,
    searchParams,
    // category,
    // searchInput,
    // time,
    // searchDistance,
    // latestNextCursor
  ]);

  const handleLoadMoreFeaturedData = (nextCursor) => {
    const now = Date.now();

    // Debounce: if less than 1000ms (1s) has passed since the last fetch, do nothing
    if (now - lastFetch < 1000) return;
    if (nextCursor === null) return;
    setIsFeaturedUpdating(true);
    setLastFetch(now);

    const fetchFeaturedLocations = async () => {
      const response = await locationApi.getFeaturedLocation(
        {
          locationCategory: searchParams.get("locationCategory"),
          searchInput: searchParams.get("searchInput"),
          lat: latitude,
          lng: longitude,
          searchDistance: searchParams.get("searchDistance"),
          weekday:
            searchParams.get("dayType") === "Weekday"
              ? {
                  openTime: searchParams.get("openFrom"),
                  closeTime: searchParams.get("closeTo"),
                }
              : null,
          weekend:
            searchParams.get("dayType") === "Weekend"
              ? {
                  openTime: searchParams.get("openFrom"),
                  closeTime: searchParams.get("closeTo"),
                }
              : null,
        },
        nextCursor
      );
      setFeaturedLocations((prev) => [...prev, ...response.data.results]);
      localStorage.setItem("featuredNextCursor", response.data.next_cursor);
      setFeaturedNextCursor(response.data.next_cursor);
      setIsFeaturedUpdating(false);
    };
    fetchFeaturedLocations();
  };

  const handleLoadMoreLatestData = (nextCursor) => {
    const now = Date.now();

    // Debounce: if less than 1000ms (1s) has passed since the last fetch, do nothing
    if (now - lastFetch < 1000) return;
    if (nextCursor === null) return;
    setIsLatestUpdating(true);
    setLastFetch(now);

    const fetchLatestLocations = async () => {
      const response = await locationApi.getLatestLocation(
        {
          locationCategory: searchParams.get("locationCategory"),
          searchInput: searchParams.get("searchInput"),
          lat: latitude,
          lng: longitude,
          searchDistance: searchParams.get("searchDistance"),
          weekday:
            searchParams.get("dayType") === "Weekday"
              ? {
                  openTime: searchParams.get("openFrom"),
                  closeTime: searchParams.get("closeTo"),
                }
              : null,
          weekend:
            searchParams.get("dayType") === "Weekend"
              ? {
                  openTime: searchParams.get("openFrom"),
                  closeTime: searchParams.get("closeTo"),
                }
              : null,
        },
        nextCursor
      );
      setLatestLocations((prev) => [...prev, ...response.data.results]);
      localStorage.setItem("latestNextCursor", response.data.next_cursor);
      setLatestNextCursor(response.data.next_cursor);
      // console.log(response)
      setIsLatestUpdating(false);
    };
    fetchLatestLocations();
  };

  useEffect(() => {
    const handlePopState = () => {
      window.location.reload();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // useEffect(() => {
  //   window.location.reload();
  // }, [searchParams])
  const renderPopularLocations = (
    <Wrapper col="true" className="gap-4 my-4">
      <Wrapper className="justify-between items-end">
        <Label className="!text-[32px]">Popular</Label>
      </Wrapper>
      {!isLoading ? (
        featuredLocations.length > 0 ? (
          <Slider
            items={featuredLocations}
            className="!bg-transparent sm:text-left !p-0"
            cardClassName="text-center hover:opacity-70 cursor-pointer"
            perView={4}
            onClick={onSelectLocation}
            loadMore={handleLoadMoreFeaturedData}
            // nextCursor={localStorage.getItem("featuredNextCursor") || null}
            type="featuredLocations"
          />
        ) : (
          <Wrapper className="justify-center">
            <Heading>No results found!</Heading>
          </Wrapper>
        )
      ) : (
        <Wrapper className="justify-center">
          <Loading />
        </Wrapper>
      )}
    </Wrapper>
  );

  const renderLatestLocations = (
    <Wrapper col="true" className="gap-4">
      <Wrapper className="justify-between items-end">
        <Label className="!text-[32px]">Latest</Label>
      </Wrapper>
      {!isLoading ? (
        latestLocations.length > 0 ? (
          <Slider
            items={latestLocations}
            className="!bg-transparent sm:text-left !p-0"
            cardClassName="bg-neutral-100 text-center"
            perView={4}
            onClick={onSelectLocation}
            loadMore={handleLoadMoreLatestData}
            type="latestLocations"
          />
        ) : (
          <Wrapper className="justify-center">
            <Heading>No results found!</Heading>
          </Wrapper>
        )
      ) : (
        <Wrapper className="justify-center">
          <Loading />
        </Wrapper>
      )}
    </Wrapper>
  );
  return (
    <>
      {!isGetCurrentLocation ? (
        <Screen className="flex flex-col gap-5 px-3 py-4 lg:gap-10 md:px-6 md:py-5 lg:px-20">
          <>
            <Wrapper col="true" className="gap-4 md:items-center">
              <SubNavbar user={user} />
            </Wrapper>

            <OnBoardingSlider />

            {searchParams.get("listType") === "POPULAR" ? (
              renderPopularLocations
            ) : searchParams.get("listType") === "LATEST" ? (
              renderLatestLocations
            ) : (
              <>
                {renderPopularLocations}
                {renderLatestLocations}
              </>
            )}
          </>
        </Screen>
      ) : (
        <Screen className="flex flex-col gap-5 px-3 py-4 lg:gap-10 md:px-6 md:py-5 lg:px-20 justify-center items-center">
          <Loading />
        </Screen>
      )}
    </>
  );
};

export default HomeScreen;
