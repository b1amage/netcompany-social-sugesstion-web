import React, { useRef } from "react";
import {
  StandaloneSearchBox,
  LoadScript,
  Autocomplete,
} from "@react-google-maps/api";

const key = import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY;

const AutoCompleteScreen = () => {
  const inputRef = useRef();

  const handlePlaceChange = () => {
    console.log("place changed");
    const places = inputRef.current.getPlaces();

    if (places) {
      console.log(places[0]);
      console.log(places[0].geometry.location.lat());
      console.log(places[0].geometry.location.lng());
    }
  };
  return (
    <div className="h-screen">
      <LoadScript libraries={["places"]} googleMapsApiKey={key}>
        <StandaloneSearchBox
          onLoad={(ref) => (inputRef.current = ref)}
          onPlacesChanged={handlePlaceChange}
          onInputChanged={handlePlaceChange}
        >
          <Autocomplete>
            <input type="text" placeholder="Enter location" autoComplete="on" />
          </Autocomplete>
        </StandaloneSearchBox>
      </LoadScript>
    </div>
  );
};

export default AutoCompleteScreen;
