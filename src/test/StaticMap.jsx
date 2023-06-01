import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import LoadingScreen from "@/screens/LoadingScreen";

const StaticMap = ({
  lat = 10.7893008,
  lng = 106.7184076,
  width,
  height,
  title,
  address,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyALU1H8LRmBHasS1uXNHj-ND9AqctT6P-k",
  });
  const [selected, setSelected] = React.useState(false);

  if (!isLoaded) return <LoadingScreen />;
  const location = { lat, lng };
  return (
    <GoogleMap
      mapContainerStyle={{ width, height }}
      zoom={18}
      center={location}
      mapContainerClassName="w-full h-screen"
    >
      <Marker
        position={location}
        title={title}
        onClick={() => {
          setSelected(true);
        }}
      />
      {selected && (
        <InfoWindow
          position={location}
          onCloseClick={() => {
            setSelected(false);
          }}
        >
          <div>
            <h2>{title}</h2>
            <p>{address}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default StaticMap;
