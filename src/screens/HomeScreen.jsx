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

import axios from "axios";

const key = import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY;

const HomeScreen = () => {
  const navigate = useNavigate();
  const [featuredLocations, setFeaturedLocations] = useState([]);
  const [latestLocations, setLatestLocations] = useState([]);
  const [featuredNextCursor, setFeaturedNextCursor] = useState();
  const [latestNextCursor, setLatestNextCursor] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const [isFeaturedLoading, setIsFeaturedLoading] = useState(true);
  const [isLatestLoading, setIsLatestLoading] = useState(true);

  // const [permissionsStatus, setPermissionStatus] = useState(
  //   localStorage.getItem("gpsPermission") || undefined
  // );

  // const { isTurnOnGPS } = useCurrentLocation();
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
    const handler = (e) => 
    {  
      e.preventDefault();
      localStorage.removeItem("gpsPermission")
    }
    window.addEventListener("beforeunload", handler);
    return () => {
        window.removeEventListener("scroll", handler);
    };
  }, []);
  // useEffect(() => {
  //   // setIsLoading(true)
  //   if (permissionsStatus === undefined || permissionsStatus === "prompt"){
  //     navigator.permissions
  //     .query({ name: "geolocation" })
  //     .then((permissionStatus) => {
  //       setPermissionStatus(permissionStatus.state);
  //       permissionStatus.onchange = () => {
  //         setPermissionStatus(permissionStatus.state);
  //         localStorage.setItem("gpsPermission", permissionStatus.state);
  //         // setIsTurnOnGPS(permissionStatus.state=="granted")
  //       };
  //     });
  //   }

  // }, [permissionsStatus, latitude, longitude]);

  useEffect(() => {
    // if (permissionsStatus === "granted") {

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        // dispatch(changeCurrentLocation(data.results[0]));
        if (localStorage.getItem("gpsPermission") === "denied") return
        // if (localStorage.setItem("defaultGpsPermission") === "denied") return
        setIsLoading(true);
        localStorage.setItem("defaultGpsPermission", "granted");
        dispatch(changeLatitude(coords.latitude));
        dispatch(changeLongitude(coords.longitude));
        // localStorage.setItem("gpsPermission", "granted");
        setIsLoading(false);
        // }
        return;
      },
      (error) => {
        localStorage.setItem("defaultGpsPermission", "denied");
        if (
          error.code == error.PERMISSION_DENIED
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
          setIsLoading(false);
        }
      }
    );

    // setIsLoading(false);

    // }
    // if (
    //   permissionsStatus === "denied" &&
    //   localStorage.getItem("currentLocation")
    // ) {
    //   dispatch(
    //     changeLatitude(
    //       JSON.parse(localStorage.getItem("currentLocation"))?.geometry
    //         ?.location?.lat
    //     )
    //   );
    //   dispatch(
    //     changeLongitude(
    //       JSON.parse(localStorage.getItem("currentLocation"))?.geometry
    //         ?.location?.lng
    //     )
    //   );
    // }
    console.log(latitude);
    console.log(longitude);
  }, [
    // permissionsStatus,
    // latitude,
    // longitude,
  ]);
  // const { coords, isGeolocationAvailable, isGeolocationEnabled } =
  //   useGeolocated({
  //     positionOptions: {
  //       enableHighAccuracy: false,
  //     },
  //     userDecisionTimeout: Infinity,
  //     isOptimisticGeolocationEnabled: permissionsStatus == "granted",
  //   });

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
    } else {
      setIsFeaturedLoading(false);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    // if (currentLocation || localStorage.getItem("currentLocation")) {
    setIsLatestLoading(true);
    if (latitude && longitude) {
      // setIsLoading(true);
      const fetchLatestLocations = async () => {
        const response = await locationApi.getLatestLocation({
          lat: latitude,
          lng: longitude,
        });
        setLatestLocations(response.data.results);
        localStorage.setItem("latestNextCursor", response.data.next_cursor);
        setLatestNextCursor(response.data.next_cursor);
        // setIsLoading(false);
        setIsLatestLoading(false);
      };
      fetchLatestLocations();
    } else {
      setIsLatestLoading(false);
    }
    // }
    // console.log(featuredNextCursor);
    // console.log(latestNextCursor);
  }, [latitude, longitude]);

  useEffect(() => {
    // setIsLoading(true)
    // if (isTurnOnGPS) {
    // console.log(isGeolocationAvailable);
    // console.log(permissionsStatus);
    console.log(isLoading);
    // console.log(isGeolocationAvailable)
    // setIsLoading(true);
    if (latitude && longitude) {
      const fetchAddress = async () => {
        const { data } = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${key}`
        );
        dispatch(changeCurrentLocation(data.results[0]));
        // dispatch(changeLatitude(data.results[0]?.geometry?.location?.lat));
        // dispatch(changeLongitude(data.results[0]?.geometry?.location?.lng));
        console.log(data.results[0]);
        localStorage.setItem(
          "currentLocation",
          JSON.stringify(data.results[0])
        );
        // setIsLoading(false);
      };
      fetchAddress();
    }
    // else{
    //   setIsLoading(false);
    // }
  }, [latitude, longitude]);

  const handleLoadMoreFeaturedData = (nextCursor) => {
    const now = Date.now();

    // Debounce: if less than 1000ms (1s) has passed since the last fetch, do nothing
    console.log(latitude);
    console.log(longitude);
    if (now - lastFetch < 1000) return;
    if (nextCursor === null) return;
    // setIsFeaturedUpdating(true);
    setLastFetch(now);

    const fetchFeaturedLocations = async () => {
      const response = await locationApi.getFeaturedLocation(
        {
          lat:
            // JSON.parse(localStorage.getItem("currentLocation"))?.geometry?.location?.lat,
            latitude,
          lng:
            // JSON.parse(localStorage.getItem("currentLocation"))?.geometry?.location?.lng,
            longitude,
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
    // setIsLatestUpdating(true);
    setLastFetch(now);

    const fetchLatestLocations = async () => {
      console.log(latitude);
      console.log(longitude);
      const response = await locationApi.getLatestLocation(
        {
          lat:
            // JSON.parse(localStorage.getItem("currentLocation"))?.geometry?.location?.lat,
            latitude,
          lng:
            // JSON.parse(localStorage.getItem("currentLocation"))?.geometry?.location?.lng,
            longitude,
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
      {!isFeaturedLoading ? (
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
        <Screen className="flex flex-col gap-5 px-3 py-4 lg:gap-10 md:px-6 md:py-5 lg:px-20 justify-center items-center">
          <Loading />
        </Screen>
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
        <Screen className="flex flex-col gap-5 px-3 py-4 lg:gap-10 md:px-6 md:py-5 lg:px-20 justify-center items-center">
          <Loading />
        </Screen>
      )}
    </Wrapper>
  );
  return (
    <>
      {/* { latitude && longitude ? */}

      {(isLoading && !latitude && !longitude ) ? (
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
