import { LoadScript, GoogleMap} from "@react-google-maps/api";
import React from "react";

const Map = () => {
  const MAP_API_KEY = "AIzaSyDboKmAun5p3lxwzR5_3MTMHHAb1Ec-nB4";

  return (
    <LoadScript googleMapsApiKey={MAP_API_KEY}>
      <GoogleMap mapContainerClassName="w-full h-[60vh] lg:h-[20vh] rounded-lg" zoom={10} center={{ lat: -34.397, lng: 150.644 }}></GoogleMap>
    </LoadScript>
  );
};

export default Map;
