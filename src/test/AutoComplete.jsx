import React, { useRef } from "react";
import {
  StandaloneSearchBox,
  LoadScript,
  Autocomplete,
} from "@react-google-maps/api";

// const key = "AIzaSyBXjAxoWM58p6UoDGA-VfpfCZ0gGidlrcw";
const key = "AIzaSyALU1H8LRmBHasS1uXNHj-ND9AqctT6P-k";

const AutoCompleteScreen = () => {
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
