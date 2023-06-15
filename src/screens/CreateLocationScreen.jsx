import Screen from "@/components/container/Screen";
import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  changeImage,
  addImage,
} from "@/features/createLocationFormSlice";
import axios from "axios";

import Portal from "@/components/HOC/Portal";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import Image from "@/components/image/Image";

import VALIDATE from "@/helpers/validateForm";
import locationApi from "@/api/locationApi";
import { useNavigate } from "react-router-dom";
import { DEFAULT } from "@/constants/defaultData";
import { imageList } from "@/constants/images";
import Loading from "@/components/loading/Loading";
import Popup from "@/components/popup/Popup";
import localStorageKey from "@/constants/localStorageKeys";
import ROUTE from "@/constants/routes";
import LocationForm from "@/components/location/LocationForm";

const CreateLocationScreen = () => {
  const [uploading, setUploading] = useState(false);
  const [isShowImage, setIsShowImage] = useState(false);
  const screen = document.getElementsByTagName("BODY")[0];
  
  const navigate = useNavigate();
  const handleShowImage = () => {
    setIsShowImage(true);
    screen.style.overflow = "hidden";
    screen.style.height = "100vh";
  };

  const handleCloseImage = () => {
    setIsShowImage(false);
    screen.style.overflow = "auto";
    screen.style.height = "auto";
  };

  const avatarRef = useRef();
  useOnClickOutside(avatarRef, handleCloseImage);

  const {
    placeId,
    images,
    image,
    category,
    title,
    address,
    lat,
    lng,
    description,
    minPrice,
    maxPrice,
    currency,
    weekdayOpenTime,
    weekdayCloseTime,
    weekendOpenTime,
    weekendCloseTime,
  } = useSelector(({ createLocationForm }) => {
    return {
      placeId: createLocationForm.placeId,
      images: createLocationForm.images,
      image: createLocationForm.image,
      category: createLocationForm.category,
      title: createLocationForm.title,
      address: createLocationForm.address,
      lat: createLocationForm.lat,
      lng: createLocationForm.lng,
      description: createLocationForm.description,
      weekdayOpenTime: createLocationForm.weekdayOpenTime,
      weekdayCloseTime: createLocationForm.weekdayCloseTime,
      weekendOpenTime: createLocationForm.weekendOpenTime,
      weekendCloseTime: createLocationForm.weekendCloseTime,
      minPrice: createLocationForm.minPrice,
      maxPrice: createLocationForm.maxPrice,
      currency: createLocationForm.currency,
    };
  });

  const [imgList, setImgList] = useState([DEFAULT.location]);
  const [titleErr, setTitleErr] = useState();
  const [categoryErr, setCategoryErr] = useState();
  const [addressErr, setAddressErr] = useState();
  const [priceErr, setPriceErr] = useState();
  const [weekdayOpenTimeErr, setWeekdayOpenTimeErr] = useState();
  const [weekdayCloseTimeErr, setWeekdayCloseTimeErr] = useState();
  const [weekendOpenTimeErr, setWeekendOpenTimeErr] = useState();
  const [weekendCloseTimeErr, setWeekendCloseTimeErr] = useState();
  const [uploadImageErr, setUploadImageErr] = useState();
  const [currencyErr, setCurrencyErr] = useState();
  const [submitErr, setSubmitErr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPopup, setIsShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitErr([]);
    let data;
    if (uploadImageErr) {
      setUploadImageErr();
    }
    setIsLoading(true);
    if (
      VALIDATE.location(address) ||
      VALIDATE.title(title) ||
      VALIDATE.category(category) ||
      VALIDATE.time(weekdayOpenTime) ||
      VALIDATE.time(weekdayCloseTime)
    ) {
      setTitleErr(VALIDATE.title(title));
      setAddressErr(VALIDATE.location(address));
      setCategoryErr(VALIDATE.category(category));
      setWeekdayOpenTimeErr(VALIDATE.time(weekdayOpenTime));
      setWeekdayCloseTimeErr(VALIDATE.time(weekdayCloseTime));
      setSubmitErr((prev) => [...prev, "Please fill in all required fields!"]);
      setIsLoading(false);
      return;
    }
    if (VALIDATE.time(weekendOpenTime) || VALIDATE.time(weekendCloseTime)){
      setWeekendOpenTimeErr(VALIDATE.time(weekendOpenTime));
      setWeekendCloseTimeErr(VALIDATE.time(weekendCloseTime));
      setSubmitErr((prev) => [...prev, "Please fill in all fields in Weekend time!"]);
      setIsLoading(false);
      return;
    }
    if (address) {
      if (!placeId) {
        setSubmitErr((prev) => [
          ...prev,
          "Address not found. Please reload page and type again or select other address!",
        ]);
        setIsLoading(false);
        return;
      }
    }
    if (VALIDATE.price(minPrice, maxPrice)) {
      setPriceErr(VALIDATE.price(minPrice, maxPrice));
      setSubmitErr((prev) => [...prev, VALIDATE.price(minPrice, maxPrice)]);
      setIsLoading(false);
      return;
    }
    if (!currency){
      setCurrencyErr("Please select the currency!")
      setSubmitErr((prev) => [...prev, "Please select the currency!"]);
      setIsLoading(false);
      return;
    }

    if (weekendOpenTime && weekendCloseTime){
      if (!minPrice && !maxPrice) {
        data = {
          placeId: placeId,
          name: title,
          address: address,
          description: description,
          imageUrls: imgList,
          locationCategory: category.title,
          location: {
            type: "Point",
            coordinates: [lng, lat],
          },
          weekday: {
            openTime: weekdayOpenTime.replace(":", ""),
            closeTime: weekdayCloseTime.replace(":", ""),
          },
          weekend: {
            openTime: weekendOpenTime.replace(":", ""),
            closeTime: weekendCloseTime.replace(":", ""),
          },
        };
      } else{
        data = {
          placeId: placeId,
          name: title,
          address: address,
          description: description,
          imageUrls: imgList,
          locationCategory: category.title,
          location: {
            type: "Point",
            coordinates: [lng, lat],
          },
          pricePerPerson: {
            min: parseInt(minPrice),
            max: parseInt(maxPrice),
            currency: currency.title || currency,
          },
          weekday: {
            openTime: weekdayOpenTime.replace(":", ""),
            closeTime: weekdayCloseTime.replace(":", ""),
          },
          weekend: {
            openTime: weekendOpenTime.replace(":", ""),
            closeTime: weekendCloseTime.replace(":", ""),
          },
        };
      }
    } else{
      if (!minPrice && !maxPrice) {
        data = {
          placeId: placeId,
          name: title,
          address: address,
          description: description,
          imageUrls: imgList,
          locationCategory: category.title,
          location: {
            type: "Point",
            coordinates: [lng, lat],
          },
          weekday: {
            openTime: weekdayOpenTime.replace(":", ""),
            closeTime: weekdayCloseTime.replace(":", ""),
          },
        };
      } else{
        data = {
          placeId: placeId,
          name: title,
          address: address,
          description: description,
          imageUrls: imgList,
          locationCategory: category.title,
          location: {
            type: "Point",
            coordinates: [lng, lat],
          },
          pricePerPerson: {
            min: parseInt(minPrice),
            max: parseInt(maxPrice),
            currency: currency.title || currency,
          },
          weekday: {
            openTime: weekdayOpenTime.replace(":", ""),
            closeTime: weekdayCloseTime.replace(":", ""),
          },
        };
      }
    }
 
    console.log(data);
    // // console.log(imgList)
    locationApi.createLocation(data, navigate, setSubmitErr, setIsShowPopup);
    // // // console.log(response)
    setIsLoading(false);
  };

  useEffect(() => {
    const user =
      localStorage.getItem(localStorageKey.user) || JSON.stringify({});
    if (user === JSON.stringify({})) {
      navigate(ROUTE.LOGIN);
    }
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      setImgList([...images]);
    }
  }, [images]);

  const handleOnChangeImage = (e) => {
    (async function () {
      setUploadImageErr();
      dispatch(changeImage());
      setUploading(true);
      // console.log(e.target.files[0])
      // console.log(e.target.value)
      if (e.target.files[0] === undefined) {
        if (images.length > 0) {
          dispatch(changeImage(images[images.length - 1]));
        }
        setUploading(false);
        return;
      }
      if (VALIDATE.selectedImage(e.target.files[0])) {
        if (images.length > 0) {
          dispatch(changeImage(images[images.length - 1]));
        }
        setUploadImageErr(VALIDATE.selectedImage(e.target.files[0]));
        setUploading(false);
        return;
      }
 
      var bodyFormData = new FormData();
      bodyFormData.append("image", e.target.files[0]);
      axios({
        method: "post",
        url:
          process.env.NODE_ENV === "dev"
            ? "http://localhost:8080/image/upload-image"
            : "https://netcompany-social-suggestion-backend.vercel.app/image/upload-image",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          console.log(response);
          dispatch(changeImage(response.data.image));
          dispatch(addImage(response.data.image));
          setUploading(false);
        })
        .catch(function (response) {
          console.log(response);
          setUploading(false);
        });
    })();
  };

  const dispatch = useDispatch();
  return (
    <Screen className={`py-8`}>
      <LocationForm image={image} images={images} uploadImageErr={uploadImageErr} isShowImage={isShowImage} handleSubmit={handleSubmit} title={title} titleErr={titleErr} address={address} addressErr={addressErr} lat={lat} lng={lng} category={category} categoryErr={categoryErr} description={description} weekdayOpenTime={weekdayOpenTime} weekdayOpenTimeErr={weekdayOpenTimeErr} weekdayCloseTime={weekdayCloseTime} weekdayCloseTimeErr={weekdayCloseTimeErr} weekendOpenTime={weekendOpenTime} weekendOpenTimeErr={weekendOpenTimeErr} weekendCloseTime={weekdayCloseTime} weekendCloseTimeErr={weekendCloseTimeErr} minPrice={minPrice} maxPrice={maxPrice} priceErr={priceErr} currency={currency} currencyErr={currencyErr} setPriceErr={setPriceErr} uploading={uploading} handleOnChangeImage={handleOnChangeImage} handleShowImage={handleShowImage} submitErr={submitErr} isLoading={isLoading} />
      {isShowImage && (
        <Portal location="body">
          <div className="absolute z-[9999] inset-0 bg-black bg-opacity-80 flex-center cursor-pointer px-20 py-12 top-0">
            <Image
              _ref={avatarRef}
              src={image}
              alt="avatar"
              className="flex items-center cursor-auto animate-zoom"
              imageClassName=""
            />
          </div>
        </Portal>
      )}
      {isShowPopup && (
        <Popup
          actions={[]}
          title="Created successful. Wait for a few seconds to be directed to the previous page"
          children={<Loading />}
          className="!fixed"
          formClassName="items-center"
          titleClassName="!text-green-500"
        />
      )}
    </Screen>
  );
};

export default CreateLocationScreen;
