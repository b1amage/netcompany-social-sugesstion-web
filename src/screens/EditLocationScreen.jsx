import Screen from "@/components/container/Screen";
import LocationForm from "@/components/location/LocationForm";
import Heading from "@/components/typography/Heading";
import React, { useEffect, useState } from "react";
import { DEFAULT } from "@/constants/defaultData";
import locationApi from "@/api/locationApi";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "@/components/loading/Loading";

const EditLocationScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [locationDetails, setLocationDetails] = useState();

  const formatTime = (timeString) => {
    const hours = timeString.slice(0, 2);
    const minutes = timeString.slice(2, 4);

    return `${hours}:${minutes}`;
  };
  useEffect(() => {
    const getLocationDetails = async () => {
      const response = await locationApi.getLocationDetails(id, navigate);
      setLocationDetails(response.data);
    };
    getLocationDetails();
  }, []);
  return (
    <>
      {!locationDetails ? <Loading /> : <Screen className={`py-8 md:py-16 lg:py-0 !mb-0 location-form`}>
        <Heading className="w-full sm:text-center !text-[42px] leading-10">
          Update Location
        </Heading>
        <LocationForm
          locationId={id}
          defaultImgList={
            locationDetails?.imageUrls.length === 1 &&
            locationDetails?.imageUrls[0] === DEFAULT.location
              ? []
              : locationDetails?.imageUrls
          }
          currentImg=""
          defaultPlaceId={locationDetails?.placeId}
          defaultTitle={locationDetails?.name}
          defaultAddress={locationDetails?.address}
          defaultDescription={locationDetails?.description}
          defaultLat={locationDetails?.location.coordinates[1]}
          defaultLng={locationDetails?.location.coordinates[0]}
          defaultCategory={{ title: locationDetails?.locationCategory }}
          defaultWeekdayTime={
            locationDetails?.weekday
              ? {
                  openTime: formatTime(locationDetails?.weekday?.openTime),
                  closeTime: formatTime(locationDetails?.weekday?.closeTime),
                }
              : {
                  openTime: "",
                  closeTime: "",
                }
          }
          defaultWeekendTime={
            locationDetails?.weekend
              ? {
                  openTime: formatTime(locationDetails?.weekend?.openTime),
                  closeTime: formatTime(locationDetails?.weekend?.closeTime),
                }
              : {
                  openTime: "",
                  closeTime: "",
                }
          }
          defaultPriceRange={
            locationDetails?.pricePerPerson ?{
            min: locationDetails?.pricePerPerson.min.toString(),
            max: locationDetails?.pricePerPerson.max.toString(),
            currency: {title: locationDetails?.pricePerPerson.currency},
          } : {
            min: undefined,
            max: undefined,
            currency: undefined,
          }
        }
        />
      </Screen>}
    </>
  );
};

export default EditLocationScreen;
