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

import {
  changeCurrentLocation,
  changeLatitude,
  changeLongitude,
} from "@/features/currentLocationSlice";

import axios from "axios";

const key = import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY;

const HomeScreen = () => {
  const navigate = useNavigate();
  const [featuredLocations, setFeaturedLocations] = useState([]);
  const [latestLocations, setLatestLocations] = useState([]);
  const [featuredNextCursor, setFeaturedNextCursor] = useState();
  const [latestNextCursor, setLatestNextCursor] = useState();

  const [isFeaturedLoading, setIsFeaturedLoading] = useState(true);
  const [isLatestLoading, setIsLatestLoading] = useState(true);

  const dispatch = useDispatch();

  const [lastFetch, setLastFetch] = useState(Date.now());

  const onSelectLocation = (id) => {
    navigate(id);
  };

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

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      // console.log("Reload")
      localStorage.removeItem("gpsPermission");
      localStorage.removeItem("isGetCurrentLocation");
    };
    window.addEventListener("beforeunload", handler);
    return () => {
      window.removeEventListener("beforeunload", handler);
    };
  }, []);

  useEffect(() => {
    if (localStorage.getItem("gpsPermission") === "denied") {
      dispatch(
        changeLatitude(
          JSON.parse(localStorage.getItem("currentLocation"))?.geometry
            ?.location?.lat
        )
      );
      dispatch(
        changeLongitude(
          JSON.parse(localStorage.getItem("currentLocation"))?.geometry
            ?.location?.lng
        )
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        localStorage.setItem("gpsPermission", "denied");
        dispatch(changeLatitude(coords.latitude));
        dispatch(changeLongitude(coords.longitude));
      },
      (error) => {
        if (
          error.code == error.PERMISSION_DENIED &&
          localStorage.getItem("currentLocation")
        ) {
          dispatch(
            changeLatitude(
              JSON.parse(localStorage.getItem("currentLocation"))?.geometry
                ?.location?.lat
            )
          );
          dispatch(
            changeLongitude(
              JSON.parse(localStorage.getItem("currentLocation"))?.geometry
                ?.location?.lng
            )
          );
        }
        localStorage.setItem("isGetCurrentLocation", false);
        setIsFeaturedLoading(false);
        setIsLatestLoading(false);
      }
    );

    console.log(latitude);
    console.log(longitude);
  }, []);

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    // LOGIN CHECK
    if (localStorage.getItem("loginReload") === "true") {
      localStorage.setItem("loginReload", "false");
      location.reload();
    }
  }, []);

  useEffect(() => {
    setIsFeaturedLoading(true);
    if (latitude && longitude) {
      const fetchFeaturedLocations = async () => {
        const response = await locationApi.getFeaturedLocation({
          lat: latitude,
          lng: longitude,
        });
        setFeaturedLocations(response.data.results);
        localStorage.setItem("featuredNextCursor", response.data.next_cursor);
        setFeaturedNextCursor(response.data.next_cursor);
        setIsFeaturedLoading(false);
      };
      fetchFeaturedLocations();
    }
  }, [latitude, longitude]);

  useEffect(() => {
    setIsLatestLoading(true);
    if (latitude && longitude) {
      const fetchLatestLocations = async () => {
        const response = await locationApi.getLatestLocation({
          lat: latitude,
          lng: longitude,
        });
        setLatestLocations(response.data.results);
        localStorage.setItem("latestNextCursor", response.data.next_cursor);
        setLatestNextCursor(response.data.next_cursor);
        setIsLatestLoading(false);
      };
      fetchLatestLocations();
    }
  }, [latitude, longitude]);

  useEffect(() => {
    // console.log(isLoading);
    if (latitude && longitude && !currentLocation) {
      const fetchAddress = async () => {
        const { data } = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${key}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        dispatch(changeCurrentLocation(data.results[0]));
        console.log(data.results[0]);
        localStorage.setItem(
          "currentLocation",
          JSON.stringify(data.results[0])
        );
        localStorage.setItem("isGetCurrentLocation", false);
      };
      fetchAddress();
    }
  }, [latitude, longitude]);

  const handleLoadMoreFeaturedData = (nextCursor) => {
    const now = Date.now();

    // Debounce: if less than 1000ms (1s) has passed since the last fetch, do nothing
    console.log(latitude);
    console.log(longitude);
    if (now - lastFetch < 1000) return;
    if (nextCursor === null) return;
    setLastFetch(now);

    const fetchFeaturedLocations = async () => {
      const response = await locationApi.getFeaturedLocation(
        {
          lat: latitude,
          lng: longitude,
        },
        nextCursor
      );
      setFeaturedLocations((prev) => [...prev, ...response.data.results]);
      localStorage.setItem("featuredNextCursor", response.data.next_cursor);
      setFeaturedNextCursor(response.data.next_cursor);
    };
    fetchFeaturedLocations();
  };

  const handleLoadMoreLatestData = (nextCursor) => {
    const now = Date.now();

    // Debounce: if less than 1000ms (1s) has passed since the last fetch, do nothing
    if (now - lastFetch < 1000) return;
    if (nextCursor === null) return;
    // setIsLatestUpdating(true);
    setLastFetch(now);

    const fetchLatestLocations = async () => {
      console.log(latitude);
      console.log(longitude);
      const response = await locationApi.getLatestLocation(
        {
          lat: latitude,
          lng: longitude,
        },
        nextCursor
      );
      setLatestLocations((prev) => [...prev, ...response.data.results]);
      localStorage.setItem("latestNextCursor", response.data.next_cursor);
      setLatestNextCursor(response.data.next_cursor);
    };
    fetchLatestLocations();
  };

  const renderPopularLocations = (
    <Wrapper col="true" className="gap-4 my-4">
      <Wrapper className="items-end justify-between">
        <Label className="!text-[32px]">Popular</Label>
      </Wrapper>
      {!isFeaturedLoading ? (
        featuredLocations.length > 0 ? (
          <Slider
            items={featuredLocations}
            className="!bg-transparent sm:text-left !p-0"
            cardClassName="text-center hover:opacity-70 cursor-pointer"
            perView={4}
            onClick={onSelectLocation}
            loadMore={handleLoadMoreFeaturedData}
            type="featuredLocations"
          />
        ) : (
          <Wrapper className="justify-center">
            <Heading>No results found!</Heading>
          </Wrapper>
        )
      ) : (
        <Wrapper className="!h-fit justify-center items-center">
          <Loading />
        </Wrapper>
      )}
    </Wrapper>
  );

  const renderLatestLocations = (
    <Wrapper col="true" className="gap-4">
      <Wrapper className="items-end justify-between">
        <Label className="!text-[32px]">Latest</Label>
      </Wrapper>
      {!isLatestLoading ? (
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
        <Wrapper className="!h-fit justify-center items-center">
          <Loading />
        </Wrapper>
      )}
    </Wrapper>
  );
  return (
    <>
      <Screen className="flex flex-col gap-5 px-3 py-4 lg:gap-10 md:px-6 md:py-5 lg:px-20">
        <>
          <Wrapper col="true" className="gap-4 md:items-center">
            <SubNavbar user={user} searchBar displayAddress />
          </Wrapper>

          <OnBoardingSlider />
          <>
            {renderPopularLocations}
            {renderLatestLocations}
          </>
          {/* )} */}
        </>
      </Screen>
      {/* )} */}
    </>
  );
};

export default HomeScreen;
