import localStorageKey from "@/constants/localStorageKeys";
import ROUTE from "@/constants/routes";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Wrapper from "@/components/wrapper/Wrapper";

import Heading from "@/components/typography/Heading";
import locationApi from "@/api/locationApi";
import Slider from "@/components/slider/Slider";
import Label from "@/components/form/Label";
import Loading from "@/components/loading/Loading";

import OnBoardingSlider from "@/components/slider/OnBoardingSlider";
import Screen from "@/components/container/Screen";

import SubNavbar from "@/components/navbar/SubNavbar";

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

  const dispatch = useDispatch();

  const [lastFetch, setLastFetch] = useState(Date.now());

  const {
    category,
    searchInput,
    // weekdayTime,
    // weekendTime,
    time,
    searchDistance,
    // isAdded,
    latitude,
    longitude,
  } = useSelector(({ filter, navbar, currentLocation }) => {
    return {
      currentLocation: currentLocation.currentLocation,
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      category: filter.category,
      searchInput: filter.searchInput,
      searchDistance: filter.searchDistance,
      time: filter.time,
      // weekdayTime: filter.weekdayTime,
      // weekendTime: filter.weekendTime,
      // isAdded: navbar.isAdded
    };
  });

  const onSelectLocation = (id) => {
    navigate(id);
  };

  // ONBOARDING CHECK
  useEffect(() => {
    const onBoardingAlreadyShown = JSON.parse(
      localStorage.getItem(localStorageKey.alreadyShownOnboarding)
    );

    !onBoardingAlreadyShown && navigate(ROUTE.ONBOARDING);
  }, []);

  // LOGIN CHECK
  useEffect(() => {
    if (localStorage.getItem("loginReload") === "true") {
      localStorage.setItem("loginReload", "false");
      location.reload();
    }

    const user =
      localStorage.getItem(localStorageKey.user) || JSON.stringify({});
    console.log("user", user);

    // check verify
    // if (user.isVerified === false) {
    //   navigate("/onboarding");
    // }
    if (user === JSON.stringify({})) {
      navigate(ROUTE.LOGIN);
    }
  }, []);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (latitude && longitude) {
      // if (currentLocation) {
      setIsLoading(true);
      const fetchFeaturedLocations = async () => {
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
        setFeaturedLocations(response.data.results);
        localStorage.setItem("featuredNextCursor", response.data.next_cursor);
        setFeaturedNextCursor(response.data.next_cursor);
        setIsLoading(false);
      };
      fetchFeaturedLocations();
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

  useEffect(() => {
    if (latitude && longitude) {
      const fetchLatestLocations = async () => {
        const response = await locationApi.getLatestLocation({
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
    category,
    searchInput,
    time,
    searchDistance,
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
      setLatestLocations((prev) => [...prev, ...response.data.results]);
      localStorage.setItem("latestNextCursor", response.data.next_cursor);
      setLatestNextCursor(response.data.next_cursor);
      // console.log(response)
      setIsLatestUpdating(false);
    };
    fetchLatestLocations();
  };

  return (
    <Screen className="flex flex-col gap-5 px-3 py-4 lg:gap-10 md:px-6 md:py-5 lg:px-20">
      <Wrapper col="true" className="gap-4 md:items-center">
        <SubNavbar user={user} />
      </Wrapper>

      <OnBoardingSlider />

      <Wrapper col="true" className="gap-4 my-4">
        <Wrapper className="items-end justify-between">
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

      <Wrapper col="true" className="gap-4">
        <Wrapper className="items-end justify-between">
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
    </Screen>
  );
};

export default HomeScreen;
