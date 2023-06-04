import React, { useRef, useState } from "react";
import {
  StandaloneSearchBox,
  LoadScript,
  Autocomplete,
} from "@react-google-maps/api";
import Error from "@/components/form/Error";

const key = import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY;

const AutoCompleteScreen = () => {
  const inputRef = useRef();
  const [value, setValue] = useState("");
  const [error, setError] = useState();

  const handlePlaceChange = () => {
    console.log("place changed");

    const places = inputRef.current.getPlaces();

    if (places) {
      console.log(places[0]);
      console.log(places[0].geometry.location.lat());
      console.log(places[0].geometry.location.lng());
      setError(false);
    } else {
      setError(true);
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
            <input
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (e.target.value === "" || !inputRef.current.getPlaces()) {
                  setError(true);
                }
              }}
              type="text"
              placeholder="Enter location"
              autoComplete="on"
            />
          </Autocomplete>
        </StandaloneSearchBox>
      </LoadScript>
      {error && <Error>Please select a location!</Error>}
    </div>
  );
};

export default AutoCompleteScreen;
