import React, { useRef, useState } from "react";
import {
  StandaloneSearchBox,
  LoadScript,
  Autocomplete,
} from "@react-google-maps/api";

const AutoCompleteScreen = () => {
  // const [atc, setAtc] = useState();
  const inputRef = useRef();

  const handlePlaceChange = () => {
    console.log("place changed");
    const places = inputRef.current.getPlaces();

    if (places) {
      console.log(places);
    }
  };
  return (
    <div className="h-screen">
      <LoadScript
        libraries={["places"]}
        googleMapsApiKey="AIzaSyDuKv0pe4l0WxGZDTKS76afTD8t5abrr78"
      >
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
