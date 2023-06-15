import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

// import LoadingScreen from "@/screens/LoadingScreen";

const StaticMap = ({
  lat = 10.7893008,
  lng = 106.7184076,
  width,
  height,
  title,
  address = "92 Nguyen Huu Canh",
}) => {
  // const key = import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY;
  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: key,
  // });
  const [selected, setSelected] = React.useState(false);

  // if (!isLoaded) return <LoadingScreen />;
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
