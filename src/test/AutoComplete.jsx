import React, { useRef, useState } from "react";
import {
  StandaloneSearchBox,
  // LoadScript,
  Autocomplete,
} from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import Label from "@/components/form/Label";

// const key = import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY;

const AutoCompleteScreen = ({ label, address, className, onChange, setShowPopup }) => {
  // const {currentLocation} = useSelector(({currentLocation}) => {
  //   return {
  //     currentLocation: currentLocation.currentLocation
  //   }
  // })

  const inputRef = useRef();
  const [value, setValue] = useState("");
  const [error, setError] = useState(true);

  const formatTime = (timeString) => {
    const hours = timeString.slice(0, 2);
    const minutes = timeString.slice(2, 4);

    return `${hours}:${minutes}`;
  };

  const dispatch = useDispatch();

  const handlePlaceChange = () => {
    console.log("place changed");

    const places = inputRef.current.getPlaces();

    if (places) {
      console.log(places[0]);
      setValue(places[0].formatted_address)
      onChange(places[0], places[0].geometry.location.lat(), places[0].geometry.location.lng());
      // console.log(places[0].geometry.location.lat());
      // console.log(places[0].geometry.location.lng());
      // dispatch(changePlaceId(places[0].place_id));

      // dispatch(changeTitle(places[0].name));
      // dispatch(changeAddress(places[0].formatted_address));
      // dispatch(changeLat(places[0].geometry.location.lat()));
      // dispatch(changeLng(places[0].geometry.location.lng()));
      // dispatch(
      //   changeWeekdayOpenTime(
      //     formatTime(places[0].opening_hours.periods[0].open.time)
      //   )
      // );
      // dispatch(
      //   changeWeekdayCloseTime(
      //     formatTime(places[0].opening_hours.periods[0].close.time)
      //   )
      // );
      // if (places[0].opening_hours.periods.length > 5) {
      //   dispatch(
      //     changeWeekendOpenTime(
      //       formatTime(places[0].opening_hours.periods[5].open.time)
      //     )
      //   );
      //   dispatch(
      //     changeWeekendCloseTime(
      //       formatTime(places[0].opening_hours.periods[5].close.time)
      //     )
      //   );
      // }
      setShowPopup(false)
      setError(false);
    } else {
      setError(true);
    }
  };
  return (
    <div className="w-full relative">
      {/* <LoadScript libraries={["places"]} googleMapsApiKey={key}> */}
      {label && <Label required>{label}</Label>}
      <StandaloneSearchBox
        onLoad={(ref) => (inputRef.current = ref)}
        onPlacesChanged={handlePlaceChange}
        onInputChanged={handlePlaceChange}
      >
        <Autocomplete className="">
          <input
            // value={value} 
            onChange={(e) => {
              if (e.target.value === "" || !inputRef.current.getPlaces()) {
                setError(true);
              }
              setValue(e.target.value)
            }}
            // value={address}
            type="text"
            placeholder="Enter location name or address"
            autoComplete="on"
            className={`w-full border border-primary-400 focus:ring-1 my-3 focus:ring-primary-400 p-4 text-sm transition-all duration-300 outline-none rounded-lg  md:text-base md:px-6 md:py-4 focus:border-primary-100 placeholder:text-secondary-100 bg-white ${className} `}
          />
        </Autocomplete>
      </StandaloneSearchBox>
      {/* </LoadScript> */}
      {/* {(error && err) && <Error className="w-full">{err}</Error>} */}
    </div>
  );
};

export default AutoCompleteScreen;
