import Button from "@/components/button/Button";
import Screen from "@/components/container/Screen";
import Wrapper from "@/components/wrapper/Wrapper";
import Label from "@/components/form/Label";
import React, { useEffect, useRef, useState } from "react";
import Input from "@/components/form/Input";
import camera from "@/assets/camera.svg";

import categoryList from "@/constants/category";
import Dropdown from "@/components/form/Dropdown";
import UploadImage from "@/components/image/UploadImage";

import PreviewImage from "@/components/image/PreviewImage";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCategory,
  changeImage,
  changeAddress,
  changeDescription,
  changeMinPrice,
  changeMaxPrice,
  changeCurrency,
  changeTitle,
  addImage,
  changeWeekdayCloseTime,
  changeWeekdayOpenTime,
  changeWeekendCloseTime,
  changeWeekendOpenTime,
} from "@/features/createLocationFormSlice";
import axios from "axios";
import { onSubmitForm } from "@/features/createLocationFormSlice";
import Portal from "@/components/HOC/Portal";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import Image from "@/components/image/Image";
import { currencyList } from "@/constants/currencyList";
import Heading from "@/components/typography/Heading";
import StaticMap from "@/test/StaticMap";
import AutoCompleteScreen from "@/test/AutoComplete";
import VALIDATE from "@/helpers/validateForm";
import Error from "@/components/form/Error";
import { LoadScript } from "@react-google-maps/api";
import locationApi from "@/api/locationApi";
import { useNavigate } from "react-router-dom";
// import { imageList } from "constants/images";

const CreateLocationScreen = () => {
  const [uploading, setUploading] = useState(false);
  const [isShowImage, setIsShowImage] = useState(false);
  // console.log(JSON.parse(localStorage.getItem("createLocationResponse")).data);
  const screen = document.getElementsByTagName("BODY")[0];
  const key = import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY;

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

  const [imagesErr, setImagesErr] = useState();
  const [categoryErr, setCategoryErr] = useState();
  const [titleErr, setTitleErr] = useState();
  const [addressErr, setAddressErr] = useState();
  const [descriptionErr, setDescriptionErr] = useState();
  const [weekdayOpenTimeErr, setWeekdayOpenTimeErr] = useState();
  const [weekdayCloseTimeErr, setWeekdayCloseTimeErr] = useState();
  const [weekendOpenTimeErr, setWeekendOpenTimeErr] = useState();
  const [weekendCloseTimeErr, setWeekendCloseTimeErr] = useState();
  // const [minPriceErr, setMinPriceErr] = useState();
  // const [maxPriceErr, setMaxPriceErr] = useState();
  const [priceErr, setPriceErr] = useState();
  const [submitErr, setSubmitErr] = useState();
  const navigate = useNavigate();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      VALIDATE.imageList(images) ||
      VALIDATE.location(address) ||
      VALIDATE.title(title) ||
      VALIDATE.category(category) ||
      VALIDATE.description(description) ||
      VALIDATE.time(weekdayOpenTime) ||
      VALIDATE.time(weekdayCloseTime) ||
      VALIDATE.time(weekendOpenTime) ||
      VALIDATE.time(weekendCloseTime)
      // VALIDATE.price(minPrice) ||
      // VALIDATE.price(maxPrice)
    ) {
      setImagesErr(VALIDATE.imageList(images));
      setTitleErr(VALIDATE.title(title));
      setAddressErr(VALIDATE.location(address));
      setCategoryErr(VALIDATE.category(category));
      setDescriptionErr(VALIDATE.description(description));
      setWeekdayOpenTimeErr(VALIDATE.time(weekdayOpenTime));
      setWeekdayCloseTimeErr(VALIDATE.time(weekdayCloseTime));
      setWeekendOpenTimeErr(VALIDATE.time(weekendOpenTime));
      setWeekendCloseTimeErr(VALIDATE.time(weekendCloseTime));
      // setMinPriceErr(VALIDATE.price(minPrice));
      // setMaxPriceErr(VALIDATE.price(maxPrice));
      // setPriceErr(VALIDATE.price(minPrice, maxPrice));
      return;
    } else {
      const data = {
        placeId: placeId,
        name: title,
        address: address,
        description: description,
        imageUrls: images,
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
      // console.log(data);
      const handleSubmit = async () => {
        const response = await locationApi.createLocation(data, setSubmitErr);
        setSubmitErr(response);
        // return response
        navigate("/");
      };
      handleSubmit();
      // console.log(response)
    }
  };
  // };

  const handleOnChangeImage = (e) => {
    (async function () {
      setUploading(true);
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

  // const {width} = useViewport()
  // useEffect(() => {
  //   if (JSON.parse(localStorage.getItem("createLocationResponse")).data.message){
  //     setSubmitErr(JSON.parse(localStorage.getItem("createLocationResponse")).data.message)
  //   }
  // }, [submitErr])
  const dispatch = useDispatch();
  return (
    <Screen className={`px-4 py-8`}>
      <form
        onSubmit={handleSubmit}
        className={`${isShowImage && "overflow-hidden h-screen"}`}
      >
        <Heading className="w-full sm:text-center !text-[42px] leading-10">
          Register New Location
        </Heading>
        <Wrapper col className="w-full my-4 xl:my-0 justify-between">
          <Wrapper className="" col>
            <LoadScript libraries={["places"]} googleMapsApiKey={key}>
              <AutoCompleteScreen
                label="Location"
                className={`${address ? "bg-neutral-100" : "bg-white"}`}
                err={addressErr}
              />
              <StaticMap
                title={title}
                width={"100%"}
                height={"60vh"}
                address={address}
                lat={lat}
                lng={lng}
              />
            </LoadScript>
          </Wrapper>

          <Wrapper className="my-4" col>
            <Input
              label="Title"
              placeholder="Enter the place's name"
              className={`rounded-lg ${title && "bg-neutral-100"} ${
                titleErr && " border-secondary-400 border-2 focus:ring-0"
              }`}
              value={title}
              err={titleErr}
              onChange={(e) => {
                dispatch(changeTitle(e.target.value));
                // setTitleErr(VALIDATE.title(e.target.value));
              }}
            />
          </Wrapper>

          <Dropdown
            label="Category"
            defaultTitle="SELECT THE CATEGORY"
            options={categoryList}
            value={category}
            onChange={(option) => dispatch(changeCategory(option))}
            err={categoryErr}
          />

          <Wrapper className="my-4" col>
            <Label>Description</Label>
            <textarea
              className={`w-full h-[150px] focus:ring-1 focus:ring-primary-400 px-4 py-3 text-sm transition-all duration-300 outline-none rounded-lg border border-black ${
                description && "bg-neutral-100"
              } md:text-base md:px-6 md:py-4 focus:border-primary-100 placeholder:text-secondary-100 resize-none ${
                descriptionErr && " border-secondary-400 border-2 focus:ring-0"
              }`}
              placeholder="Enter the description"
              value={description}
              onChange={(e) => {
                dispatch(changeDescription(e.target.value));
                // setDescriptionErr(VALIDATE.description(e.target.value));
              }}
            />
            {descriptionErr && <Error fluid>{descriptionErr}</Error>}
          </Wrapper>

          <Wrapper col className="gap-4">
            <Label>Time</Label>
            <Wrapper className="justify-between gap-2 sm:items-center sm:flex-row flex-col">
              <Label>Weekday:</Label>
              <Wrapper className="justify-between gap-4 ">
                <Input
                  label="Open time"
                  type="time"
                  className={`h-[60px] flex justify-between sm:!w-fit ${
                    weekdayOpenTime ? "bg-neutral-100" : "bg-white"
                  } ${
                    weekdayOpenTimeErr &&
                    " border-secondary-400 border-2 focus:ring-0"
                  }`}
                  onChange={(e) => {
                    dispatch(changeWeekdayOpenTime(e.target.value));
                    // setWeekdayOpenTimeErr(VALIDATE.time(e.target.value));
                  }}
                  value={weekdayOpenTime}
                  err={weekdayOpenTimeErr}
                />
                <Input
                  label="Close time"
                  type="time"
                  className={`h-[60px] flex justify-between  sm:!w-fit ${
                    weekdayCloseTime ? "bg-neutral-100" : "bg-white"
                  } ${
                    weekdayCloseTimeErr &&
                    " border-secondary-400 border-2 focus:ring-0"
                  }`}
                  onChange={(e) => {
                    dispatch(changeWeekdayCloseTime(e.target.value));
                    // setWeekdayCloseTimeErr(VALIDATE.time(e.target.value));
                  }}
                  value={weekdayCloseTime}
                  err={weekdayCloseTimeErr}
                />
              </Wrapper>
            </Wrapper>

            <Wrapper className="justify-between gap-2 sm:items-center sm:flex-row flex-col">
              <Label>Weekend: </Label>

              <Wrapper className="gap-4 justify-between">
                <Input
                  label="Open time"
                  type="time"
                  className={`h-[60px]  sm:!w-fit flex justify-between ${
                    weekendOpenTime ? "bg-neutral-100" : "bg-white"
                  } ${
                    weekendOpenTimeErr &&
                    " border-secondary-400 border-2 focus:ring-0"
                  }`}
                  onChange={(e) => {
                    dispatch(changeWeekendOpenTime(e.target.value));
                    // setWeekendOpenTimeErr(VALIDATE.time(e.target.value));
                  }}
                  value={weekendOpenTime}
                  err={weekendOpenTimeErr}
                />
                <Input
                  label="Close time"
                  type="time"
                  className={`h-[60px] sm:!w-fit flex justify-end  ${
                    weekendCloseTime ? "bg-neutral-100" : "bg-white"
                  } ${
                    weekendCloseTimeErr &&
                    " !border-secondary-400 border-2 !focus:ring-0"
                  }`}
                  onChange={(e) => {
                    dispatch(changeWeekendCloseTime(e.target.value));
                    setWeekendCloseTimeErr(VALIDATE.time(e.target.value));
                  }}
                  value={weekendCloseTime}
                  err={weekendCloseTimeErr}
                />
              </Wrapper>
            </Wrapper>
          </Wrapper>

          <Wrapper col className="my-4 ">
            <Label>
              Price Range per person <i>(optional)</i>{" "}
            </Label>
            <Wrapper className="sm:flex-row flex-col">
              <Wrapper className="w-full justify-between sm:justify-start sm:gap-8">
                <Input
                  label="From: "
                  className={`rounded-lg w-full !py-4 ${
                    minPrice && "bg-neutral-100"
                  } ${
                    priceErr && " !border-secondary-400 border-2 !focus:ring-0"
                  }`}
                  type="number"
                  value={minPrice}
                  onChange={(e) => {
                    dispatch(changeMinPrice(e.target.value));
                    // setPriceErr(VALIDATE.price(minPrice, maxPrice))
                  }}
                  min={0}
                  // err={minPriceErr}
                  placeholder="Enter the price"
                />
                <Input
                  label="To: "
                  className={`rounded-lg w-full py-4 ${
                    maxPrice && "bg-neutral-100"
                  } ${
                    priceErr && " !border-secondary-400 border-2 !focus:ring-0"
                  }`}
                  type="number"
                  value={maxPrice}
                  onChange={(e) => {
                    dispatch(changeMaxPrice(e.target.value));
                    setPriceErr(VALIDATE.price(minPrice, maxPrice));
                  }}
                  min={minPrice}
                  placeholder="Enter the price"
                  // err={maxPriceErr}
                />
              </Wrapper>
              <Dropdown
                label="Currency"
                className="sm:w-fit rounded-lg h-fit"
                options={currencyList}
                value={currency}
                defaultTitle={currency}
                onChange={(option) => dispatch(changeCurrency(option))}
              />
            </Wrapper>
            <Error fluid className={`${!priceErr && "invisible"}`}>
              {priceErr}
            </Error>
          </Wrapper>
          <div className="w-full flex flex-col gap-4 h-auto">
            <Wrapper className="justify-between">
              <Heading className="w-full flex px-4 items-center">
                Add location image
              </Heading>
              <UploadImage
                className="lg:my-0 !justify-end"
                icon={camera}
                uploading={uploading}
                onChange={handleOnChangeImage}
              />
            </Wrapper>

            <div
              className={`border border-dashed border-black rounded-lg relative h-[60vh]`}
            >
              {image && (
                <Image
                  src={image}
                  alt="img"
                  className="h-[60vh]"
                  imageClassName=""
                  onClick={handleShowImage}
                />
              )}
            </div>
            {imagesErr && <Error className="w-full">{imagesErr}</Error>}
            {/* {images.length > 0 && ( */}
            <PreviewImage
              className={`h-[25vh] items-center ${
                images.length <= 0 && "invisible"
              }`}
              src={image}
              imageList={images}
            />
            {/* )} */}
            <Error className={`${submitErr ? "visible" : "invisible"} w-full`}>
              {submitErr}
            </Error>

            <Button className="mt-8 mb-0" primary active>
              Submit
            </Button>
          </div>
        </Wrapper>
      </form>
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
    </Screen>
  );
};

export default CreateLocationScreen;
