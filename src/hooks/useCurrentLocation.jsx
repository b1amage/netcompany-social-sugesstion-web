import axios from "axios";

import React, { useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCurrentLocation,
  changeLatitude,
  changeLongitude,
} from "@/features/currentLocationSlice";
const key = import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY;

const useCurrentLocation = () => {
  const [isGetCurrentLocation, setIsGetCurrentLocation] = useState(true);
  const [isTurnOnGPS, setIsTurnOnGPS] = useState(false);
  const dispatch = useDispatch();

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: Infinity,
    });
  useEffect(() => {
    if (isGeolocationAvailable && isGeolocationEnabled) {
      setIsTurnOnGPS(true);
    } else {
      setIsTurnOnGPS(false);

      // setTimeout(() => {
      // setIsGetCurrentLocation(false)
      // }, 4000)
    }
  }, [isGeolocationAvailable, isGeolocationEnabled]);
  return { isTurnOnGPS };
};

export default useCurrentLocation;
