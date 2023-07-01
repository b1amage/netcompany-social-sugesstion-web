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
// import useCurrentLocation from "@/hooks/useCurrentLocation";
import {
  changeCurrentLocation,
  changeLatitude,
  changeLongitude,
} from "@/features/currentLocationSlice";
import { useGeolocated } from "react-geolocated";
import axios from "axios";

const key = import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY;

const HomeScreen = (props) => {
  const navigate = useNavigate();
  const [featuredLocations, setFeaturedLocations] = useState([]);
  const [latestLocations, setLatestLocations] = useState([]);
  const [featuredNextCursor, setFeaturedNextCursor] = useState();
  const [latestNextCursor, setLatestNextCursor] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [isTurnOnGPS, setIsTurnOnGPS] = useState(false);
  const [permissionsStatus, setPermissionStatus] = useState();

  // const { isTurnOnGPS } = useCurrentLocation();
  const dispatch = useDispatch();

  const [lastFetch, setLastFetch] = useState(Date.now());

  const onSelectLocation = (id) => {
    navigate(id);
  };

  useEffect(() => {
    // setIsLoading(true)
    navigator.permissions
      .query({ name: "geolocation" })
      .then((permissionStatus) => {
        setPermissionStatus(permissionStatus.state);
        permissionStatus.onchange = () => {
          setPermissionStatus(permissionStatus.state);
          // setIsTurnOnGPS(permissionStatus.state=="granted")
        };
      });
  }, [permissionsStatus]);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: Infinity,
      isOptimisticGeolocationEnabled: permissionsStatus == "granted",
    });

  useEffect(() => {
    // setIsLoading(true)
    // if (isTurnOnGPS) {
    console.log(isGeolocationAvailable);
    console.log(permissionsStatus);
    console.log(isLoading);
    // console.log(isGeolocationAvailable)
    setIsLoading(true);
    if (isGeolocationAvailable && isGeolocationEnabled && coords) {
      const fetchAddress = async () => {
        const { data } = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${key}`
        );
        dispatch(changeCurrentLocation(data.results[0]));
        dispatch(changeLatitude(data.results[0]?.geometry?.location?.lat));
        dispatch(changeLongitude(data.results[0]?.geometry?.location?.lng));
        console.log(data.results[0]);
        localStorage.setItem(
          "currentLocation",
          JSON.stringify(data.results[0])
        );
        setIsLoading(false);
      };
      fetchAddress();
    }
  }, [isGeolocationAvailable, isGeolocationEnabled, coords]);

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

  // useEffect(() => {
  //   if (localStorage.getItem("loginReload") === "true") {
  //     localStorage.setItem("loginReload", "false");
  //     location.reload();
  //   }

  //   const user =
  //     localStorage.getItem(localStorageKey.user) || JSON.stringify({});
  //   if (user === JSON.stringify({})) {
  //     navigate(ROUTE.LOGIN);
  //   }
  // }, []);
  const { user } = useSelector((state) => state.user);

  // ONBOARDING CHECK
  useEffect(() => {
    const onBoardingAlreadyShown = JSON.parse(
      localStorage.getItem(localStorageKey.alreadyShownOnboarding)
    );

    if (!onBoardingAlreadyShown) {
      navigate(ROUTE.ONBOARDING);
      return;
    }

    // LOGIN CHECK
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

  useEffect(() => {
    // if (latitude && longitude) {
      if (currentLocation || localStorage.getItem("currentLocation")) {
      // setIsLoading(true);
      const fetchFeaturedLocations = async () => {
        const response = await locationApi.getFeaturedLocation({
          lat: permissionsStatus === "granted"
            ? latitude
            : JSON.parse(localStorage.getItem("currentLocation"))?.geometry
                ?.location?.lat,
          lng: permissionsStatus === "granted"
            ? longitude
            : JSON.parse(localStorage.getItem("currentLocation"))?.geometry
                ?.location?.lng,
        });
        setFeaturedLocations(response.data.results);
        localStorage.setItem("featuredNextCursor", response.data.next_cursor);
        setFeaturedNextCursor(response.data.next_cursor);
        // setIsLoading(false);
      };
      fetchFeaturedLocations();
    }
  }, [permissionsStatus, latitude, longitude]);

  useEffect(() => {
    if (currentLocation || localStorage.getItem("currentLocation")) {
      const fetchLatestLocations = async () => {
        const response = await locationApi.getLatestLocation({
          lat: permissionsStatus === "granted"
            ? latitude
            : JSON.parse(localStorage.getItem("currentLocation"))?.geometry
                ?.location?.lat,
          lng: permissionsStatus === "granted"
            ? longitude
            : JSON.parse(localStorage.getItem("currentLocation"))?.geometry
                ?.location?.lng,
        });
        setLatestLocations(response.data.results);
        localStorage.setItem("latestNextCursor", response.data.next_cursor);
        setLatestNextCursor(response.data.next_cursor);
        // setIsLoading(false);
      };
      fetchLatestLocations();
    }
    // console.log(featuredNextCursor);
    // console.log(latestNextCursor);
  }, [permissionsStatus, latitude, longitude]);

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
          lat: permissionsStatus === "granted"
            ? latitude
            : JSON.parse(localStorage.getItem("currentLocation"))?.geometry
                ?.location?.lat,
          lng: permissionsStatus === "granted"
            ? longitude
            : JSON.parse(localStorage.getItem("currentLocation"))?.geometry
                ?.location?.lng,
        },
        nextCursor
      );
      setFeaturedLocations((prev) => [...prev, ...response.data.results]);
      localStorage.setItem("featuredNextCursor", response.data.next_cursor);
      setFeaturedNextCursor(response.data.next_cursor);
      // setIsFeaturedUpdating(false);
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
          lat: permissionsStatus === "granted"
            ? latitude
            : JSON.parse(localStorage.getItem("currentLocation"))?.geometry
                ?.location?.lat,
          lng: permissionsStatus === "granted"
            ? longitude
            : JSON.parse(localStorage.getItem("currentLocation"))?.geometry
                ?.location?.lng,
        },
        nextCursor
      );
      setLatestLocations((prev) => [...prev, ...response.data.results]);
      localStorage.setItem("latestNextCursor", response.data.next_cursor);
      setLatestNextCursor(response.data.next_cursor);
      // console.log(response)
      // setIsLatestUpdating(false);
    };
    fetchLatestLocations();
  };

  const renderPopularLocations = (
    <Wrapper col="true" className="gap-4 my-4">
      <Wrapper className="justify-between items-end">
        <Label className="!text-[32px]">Popular</Label>
      </Wrapper>
      {/* {!isLoading ? ( */}
      {featuredLocations.length > 0 ? (
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
      )}
    </Wrapper>
  );

  // : (
  //   <Wrapper className="justify-center">
  //     <Loading />
  //   </Wrapper>
  // )}
  const renderLatestLocations = (
    <Wrapper col="true" className="gap-4">
      <Wrapper className="justify-between items-end">
        <Label className="!text-[32px]">Latest</Label>
      </Wrapper>
      {/* {!isLoading ? ( */}
      {latestLocations.length > 0 ? (
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
      )}
    </Wrapper>
  );
  return (
    <>
      { permissionsStatus === undefined?<Screen className="flex flex-col gap-5 px-3 py-4 lg:gap-10 md:px-6 md:py-5 lg:px-20 justify-center items-center">
          <Heading>Please denied or allow to give the permission to access your current location!</Heading>
        </Screen> :permissionsStatus === "prompt" ? (
        <Screen className="flex flex-col gap-5 px-3 py-4 lg:gap-10 md:px-6 md:py-5 lg:px-20 justify-center items-center">
          <Loading />
        </Screen>
      ) : permissionsStatus === "denied" ? (
        <Screen className="flex flex-col gap-5 px-3 py-4 lg:gap-10 md:px-6 md:py-5 lg:px-20">
          <>
            <Wrapper col="true" className="gap-4 md:items-center">
              <SubNavbar user={user} searchBar />
            </Wrapper>

            <OnBoardingSlider />

            {/* {searchParams.get("listType") === "POPULAR" ? (
                renderPopularLocations
              ) : searchParams.get("listType") === "LATEST" ? (
                renderLatestLocations
              ) : ( */}
            <>
              {renderPopularLocations}
              {renderLatestLocations}
            </>
            {/* )} */}
          </>
        </Screen>
      ) : isLoading ? (
        <Screen className="flex flex-col gap-5 px-3 py-4 lg:gap-10 md:px-6 md:py-5 lg:px-20 justify-center items-center">
          <Loading />
        </Screen>
      ) : (
        <Screen className="flex flex-col gap-5 px-3 py-4 lg:gap-10 md:px-6 md:py-5 lg:px-20">
          <>
            <Wrapper col="true" className="gap-4 md:items-center">
              <SubNavbar user={user} searchBar />
            </Wrapper>

            <OnBoardingSlider />
            <>
              {renderPopularLocations}
              {renderLatestLocations}
            </>
            {/* )} */}
          </>
        </Screen>
      )}
    </>
  );
};

export default HomeScreen;
