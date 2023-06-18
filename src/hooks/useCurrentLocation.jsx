import axios from "axios";

import React, { useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrentLocation, changeLatitude, changeLongitude } from "@/features/currentLocationSlice";
const key = import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY;

const useCurrentLocation = () => {
//   const [latitude, setLatitude] = useState();
//   const [longitude, setLongitude] = useState();
//   const [location, setLocation] = useState()
//   const {currentLocation} = useSelector(
//     ({ currentLocation }) => {
//       return {
//         currentLocation: currentLocation.currentLocation,
//       };
//     }
//   );
    const [isGetCurrentLocation, setIsGetCurrentLocation] = useState(false)
  const dispatch = useDispatch();

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: Infinity,
    });
  useEffect(() => {
    setIsGetCurrentLocation(true)
    if (isGeolocationAvailable && isGeolocationEnabled && coords) {
      // console.log(coords.latitude);
      // console.log(coords.longitude);
    //   dispatch(changeLatitude(coords.latitude));
    //   dispatch(changeLongitude(coords.longitude));
      const fetchAddress = async () => {
        const { data } = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${key}`
        );
        dispatch(changeCurrentLocation(data.results[0]));
        dispatch(changeLatitude(data.results[0].geometry.location.lat))
        dispatch(changeLongitude(data.results[0].geometry.location.lng))
        console.log(data.results[0]);
        setIsGetCurrentLocation(false)
      };
      fetchAddress();
    } else{
        setIsGetCurrentLocation(false)
    }
  }, [isGeolocationAvailable, isGeolocationEnabled, coords]);
  return {isGetCurrentLocation};
};

export default useCurrentLocation;
