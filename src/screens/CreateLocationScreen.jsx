import Screen from "@/components/container/Screen";
import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import useViewport from "@/hooks/useScreenWidth";
import Input from "@/components/form/Input";
import camera from "@/assets/camera.svg";
import Slider from "@/components/slider/Slider";

import categoryList from "@/constants/category";
import Dropdown from "@/components/form/Dropdown";
import UploadImage from "@/components/image/UploadImage";
import Portal from "@/components/HOC/Portal";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import Image from "@/components/image/Image";

import VALIDATE from "@/helpers/validateForm";
import locationApi from "@/api/locationApi";
import { useNavigate } from "react-router-dom";
import { DEFAULT } from "@/constants/defaultData";
// import { imageList } from "@/constants/images";
import Loading from "@/components/loading/Loading";
import Popup from "@/components/popup/Popup";
import localStorageKey from "@/constants/localStorageKeys";
import ROUTE from "@/constants/routes";
// import LocationForm from "@/components/location/LocationForm";

import {
  changeCategory,
  changeDescription,
  changeMinPrice,
  changeMaxPrice,
  changeCurrency,
  changeTitle,
  changeImage,
  addImage,
  changeWeekdayCloseTime,
  changeWeekdayOpenTime,
  changeWeekendCloseTime,
  changeWeekendOpenTime,
} from "@/features/createLocationFormSlice";

import { currencyList } from "@/constants/currencyList";

import Heading from "@/components/typography/Heading";
import StaticMap from "@/test/StaticMap";
import AutoCompleteScreen from "@/test/AutoComplete";

import Error from "@/components/form/Error";
import Wrapper from "@/components/wrapper/Wrapper";
import Label from "@/components/form/Label";
import Button from "@/components/button/Button";

const CreateLocationScreen = () => {
  const [uploading, setUploading] = useState(false);
  const [isShowImage, setIsShowImage] = useState(false);
  const screen = document.getElementsByTagName("BODY")[0];
  const { width } = useViewport();
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
  // const [weekendOpenTimeErr, setWeekendOpenTimeErr] = useState();
  // const [weekendCloseTimeErr, setWeekendCloseTimeErr] = useState();
  const [weekendTimeErr, setWeekendTimeErr] = useState();
  const [uploadImageErr, setUploadImageErr] = useState();
  const [currencyErr, setCurrencyErr] = useState();
  const [submitErr, setSubmitErr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPopup, setIsShowPopup] = useState(false);

  const dispatch = useDispatch();

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

    if (weekendOpenTime && weekendCloseTime) {
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
      } else {
        if ((minPrice && !maxPrice)  || (!minPrice && maxPrice)) {
          setPriceErr('Please fill in all fields in "Price"!');
          setSubmitErr((prev) => [
            ...prev,
            'Please fill in all fields in "Price"!',
          ]);
          setIsLoading(false);
          return;
        }
        if (VALIDATE.price(minPrice, maxPrice)) {
          setPriceErr(VALIDATE.price(minPrice, maxPrice));
          setSubmitErr((prev) => [
            ...prev,
            VALIDATE.price(minPrice, maxPrice),
          ]);
          setIsLoading(false);
          return;
        }
        if (!currency) {
          setCurrencyErr("Please select the currency!");
          setSubmitErr((prev) => [...prev, "Please select the currency!"]);
          setIsLoading(false);
          return;
        }
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
    } else {
      if (
        (weekendOpenTime && !weekendCloseTime) ||
        (!weekendOpenTime && weekendCloseTime)
      ) {
        // setWeekendOpenTimeErr(VALIDATE.time(weekendOpenTime));
        // setWeekendCloseTimeErr(VALIDATE.time(weekendCloseTime));
        setWeekendTimeErr('Please fill in all fields in "Weekend" time!');
        setSubmitErr((prev) => [
          ...prev,
          'Please fill in all fields in "Weekend" time!',
        ]);
        setIsLoading(false);
        return;
      } else {
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
        } else {
          if ((minPrice && !maxPrice)  || (!minPrice && maxPrice)) {
            setPriceErr('Please fill in all fields in "Price"!');
            setSubmitErr((prev) => [
              ...prev,
              'Please fill in all fields in "Price"!',
            ]);
            setIsLoading(false);
            return;
          }
          if (VALIDATE.price(minPrice, maxPrice)) {
            setPriceErr(VALIDATE.price(minPrice, maxPrice));
            setSubmitErr((prev) => [
              ...prev,
              VALIDATE.price(minPrice, maxPrice),
            ]);
            setIsLoading(false);
            return;
          }
          if (!currency) {
            setCurrencyErr("Please select the currency!");
            setSubmitErr((prev) => [...prev, "Please select the currency!"]);
            setIsLoading(false);
            return;
          }
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

  return (
    <Screen className={`py-8 location-form`}>
      <form
        onSubmit={handleSubmit}
        className={`${isShowImage && "overflow-hidden h-screen"}`}
      >
        <Heading className="w-full sm:text-center !text-[42px] leading-10">
          Register New Location
        </Heading>
        <Wrapper
          col="true"
          className="justify-between w-full gap-8 my-4 xl:my-0"
        >
          <Wrapper className="" col="true">
            <AutoCompleteScreen
              label="Location"
              className={`bg-white`}
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
          </Wrapper>

          <Wrapper className="my-4" col="true">
            <Label>
              Title <span className="text-secondary-400">*</span>
            </Label>
            <Input
              // label={`Title <span className="text-secondary-400">*</span>`}
              placeholder="Enter the place's name"
              className={`rounded-lg ${
                title
                  ? "!border-green-500 focus:ring-2 ring-1 focus:!ring-green-500 ring-green-500"
                  : titleErr
                  ? "focus:!ring-secondary-400  !border-secondary-400 focus:ring-2 ring-1 ring-secondary-400"
                  : "focus:!border-secondary-400 focus:!ring-secondary-400"
              }`}
              value={title}
              // err={titleErr}
              onChange={(e) => {
                dispatch(changeTitle(e.target.value));
                // setTitleErr(VALIDATE.title(title));
              }}
            />
          </Wrapper>

          <Dropdown
            required
            label="Category"
            defaultTitle="SELECT THE CATEGORY"
            options={categoryList}
            value={category}
            onChange={(option) => {
              dispatch(changeCategory(option));
            }}
            err={categoryErr}
          />

          <Wrapper className="my-4" col="true">
            <Label>
              Description <i>(optional)</i>
            </Label>
            <textarea
              className={`w-full bg-white h-[150px] focus:ring-1 focus:ring-primary-400 px-4 py-3 text-sm transition-all duration-300 outline-none rounded-lg border border-black ${
                description &&
                " !border-green-500 focus:ring-2 ring-1 focus:!ring-green-500 ring-green-500"
              } md:text-base md:px-6 md:py-4 focus:border-primary-100 placeholder:text-secondary-100 resize-none`}
              placeholder="Enter the description"
              value={description}
              onChange={(e) => {
                dispatch(changeDescription(e.target.value));
              }}
            />
          </Wrapper>

          <Wrapper col="true" className="gap-8 xl:flex-row">
            <Wrapper col="true" className="gap-4">
              <Label>
                Time <span className="text-secondary-400">*</span>
              </Label>

              <Wrapper
                col="true"
                className={`gap-4 ${width > 520 && "!flex-row "} w-full`}
              >
                <Wrapper className="flex-col gap-2 w-full">
                  <Label>Weekday:</Label>
                  <Wrapper className="gap-4 w-full">
                    <Wrapper col="true" className="w-full">
                      <Label className="!text-[14px]">
                        Open time: <span className="text-secondary-400">*</span>
                      </Label>
                      <Input
                        type="time"
                        className={`h-[60px] appearance-none flex justify-between !w-full bg-white ${
                          weekdayOpenTime
                            ? "!border-green-500 focus:ring-2 ring-1 focus:!ring-green-500 ring-green-500"
                            : weekdayOpenTimeErr
                            ? "focus:!ring-secondary-400 !border-secondary-400 border-2"
                            : "focus:!border-secondary-400 focus:!ring-secondary-400"
                        }`}
                        onChange={(e) => {
                          dispatch(changeWeekdayOpenTime(e.target.value));
                        }}
                        value={weekdayOpenTime}
                      />
                    </Wrapper>

                    <Wrapper col="true" className="w-full">
                      <Label className="!text-[14px]">
                        Close time:{" "}
                        <span className="text-secondary-400">*</span>
                      </Label>
                      <Input
                        type="time"
                        className={`h-[60px] appearance-none flex justify-between bg-white !w-full ${
                          weekdayCloseTime
                            ? "!border-green-500 focus:ring-2 ring-1 focus:!ring-green-500 ring-green-500"
                            : weekdayCloseTimeErr
                            ? "focus:!ring-secondary-400  !border-secondary-400 focus:ring-2 ring-1 ring-secondary-400"
                            : "focus:!border-secondary-400 focus:!ring-secondary-400"
                        }`}
                        onChange={(e) => {
                          dispatch(changeWeekdayCloseTime(e.target.value));
                        }}
                        value={weekdayCloseTime}
                      />
                    </Wrapper>
                  </Wrapper>
                </Wrapper>

                {width >= 520 && <div className=" w-[1px] bg-black"></div>}

                <Wrapper className="flex-col gap-2 w-full">
                  <Label>
                    Weekend: <i>(Optional)</i>
                  </Label>

                  <Wrapper className="gap-4">
                    <Wrapper col="true" className="!w-full">
                      <Label className="!text-[14px]">Open time:</Label>
                      <Input
                        type="time"
                        className={`h-[60px] appearance-none !w-full flex justify-between bg-white ${
                          weekendOpenTime
                            ? "!border-green-500 focus:ring-2 ring-1 focus:!ring-green-500 ring-green-500"
                            : weekendTimeErr &&
                              weekendCloseTime &&
                              "focus:!ring-secondary-400  !border-secondary-400 focus:ring-2 ring-1 ring-secondary-400"
                        }`}
                        onChange={(e) => {
                          dispatch(changeWeekendOpenTime(e.target.value));
                          // setWeekendTimeErr(VALIDATE.time(e.target.value))
                        }}
                        value={weekendOpenTime}
                      />
                    </Wrapper>

                    <Wrapper col="true" className="w-full">
                      <Label className="!text-[14px]">Close time:</Label>
                      <Input
                        type="time"
                        className={`h-[60px] appearance-none !w-full flex justify-end bg-white ${
                          weekendCloseTime
                            ? "!border-green-500 focus:ring-2 ring-1 focus:!ring-green-500 ring-green-500"
                            : weekendTimeErr &&
                              weekendOpenTime &&
                              "focus:!ring-secondary-400  !border-secondary-400 focus:ring-2 ring-1 ring-secondary-400"
                        }`}
                        onChange={(e) => {
                          dispatch(changeWeekendCloseTime(e.target.value));
                          // setWeekendTimeErr(VALIDATE.time(e.target.value))
                          // setWeekendCloseTimeErr(VALIDATE.time(e.target.value));
                        }}
                        value={weekendCloseTime}
                        // err={weekendCloseTimeErr}
                      />
                    </Wrapper>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <div className=" w-[1px] bg-black lg:block hidden"></div>

            <Wrapper col="true" className="justify-between">
              <Label>
                Price Range per person <i>(optional)</i>{" "}
              </Label>
              <Wrapper className="flex-col gap-4 sm:flex-row !w-full">
                <Wrapper className="justify-between gap-4 sm:justify-start !w-full">
                  <Input
                    label="From: "
                    className={`rounded-lg w-full !py-4 bg-white ${
                      minPrice &&
                      (priceErr
                        ? " focus:!ring-secondary-400  !border-secondary-400 focus:ring-2 ring-1 ring-secondary-400"
                        : "!border-green-500 focus:ring-2 ring-1 focus:!ring-green-500 ring-green-500")
                    }`}
                    type="number"
                    value={minPrice}
                    onChange={(e) => {
                      dispatch(changeMinPrice(e.target.value));
                      setPriceErr(VALIDATE.price(e.target.value, maxPrice));
                    }}
                    // min={0}
                    // err={minPriceErr}
                    onWheel={(e) => e.target.blur()}
                    placeholder="Enter the price"
                  />
                  <Input
                    label="To: "
                    className={`rounded-lg w-full py-4 bg-white ${
                      maxPrice &&
                      (priceErr
                        ? " focus:!ring-secondary-400  !border-secondary-400 focus:ring-2 ring-1 ring-secondary-400"
                        : "!border-green-500 focus:ring-2 ring-1 focus:!ring-green-500 ring-green-500")
                    }`}
                    type="number"
                    value={maxPrice}
                    onChange={(e) => {
                      dispatch(changeMaxPrice(e.target.value));
                      setPriceErr(VALIDATE.price(minPrice, e.target.value));
                    }}
                    // min={0}
                    placeholder="Enter the price"
                    onWheel={(e) => e.target.blur()}
                    // err={maxPriceErr}
                  />
                </Wrapper>
                <Dropdown
                  label="Currency:"
                  className=" rounded-lg"
                  wrapperClassName="xl:max-w-[240px] !w-full"
                  options={currencyList}
                  value={currency}
                  defaultTitle={"SELECT CURRENCY"}
                  onChange={(option) => dispatch(changeCurrency(option))}
                  err={currencyErr}
                />
              </Wrapper>
            </Wrapper>
          </Wrapper>

          <div className="flex flex-col w-full h-auto gap-1.5">
            <Wrapper className="justify-between">
              <Label className="flex items-center w-full px-4">
                Location image <i>(optional)</i>
              </Label>
              <UploadImage
                className="lg:my-0 !justify-end"
                icon={camera}
                uploading={uploading}
                onChange={(e) => {
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
                      setUploadImageErr(
                        VALIDATE.selectedImage(e.target.files[0])
                      );
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
                        console.log(response.data.image);
                        dispatch(changeImage(response.data.image));
                        dispatch(addImage(response.data.image));
                        setUploading(false);
                      })
                      .catch(function (response) {
                        console.log(response);
                        setUploading(false);
                      });
                  })();
                }}
              />
            </Wrapper>
            <Error className={`${!uploadImageErr && "invisible"} !my-0`} fluid>
              {uploadImageErr}
            </Error>

            <div
              className={`border border-black rounded-lg relative h-[60vh] flex justify-center items-center`}
            >
              {uploading ? (
                <Loading />
              ) : (
                image && (
                  <Image
                    src={image}
                    alt="img"
                    className="h-full w-full max-h-[60vh]"
                    imageClassName=""
                    onClick={handleShowImage}
                  />
                )
              )}
            </div>

            {images.length > 0 && (
              <Slider
                src={image}
                className={`py-2 h-[24vh] items-center ${
                  images.length <= 0 && "invisible"
                }`}
                imgList={images}
                perView={width > 768 ? 4 : 2}
              />
            )}

            <Error
              fluid
              className={`${submitErr.length > 0 ? "visible" : "invisible"}`}
            >
              <Wrapper col="true">
                {submitErr.map((msg) => {
                  return <p key={msg}>{msg}</p>;
                })}
              </Wrapper>
            </Error>

            <Button
              className="!my-0 h-16 disabled:opacity-70"
              loadingClassName="!h-8 !w-8 !border-r-white !border-l-white"
              primary
              active
              isLoading={isLoading}
            >
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
