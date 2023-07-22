import React, { useEffect, useRef, useState } from "react";

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
// import localStorageKey from "@/constants/localStorageKeys";
// import ROUTE from "@/constants/routes";

import { currencyList } from "@/constants/currencyList";

import Heading from "@/components/typography/Heading";
import StaticMap from "@/test/StaticMap";
import AutoCompleteScreen from "@/test/AutoComplete";

import Error from "@/components/form/Error";
import Wrapper from "@/components/wrapper/Wrapper";
import Label from "@/components/form/Label";
import Button from "@/components/button/Button";
import Time from "./Time";
import Price from "./Price";
import { toast } from "react-hot-toast";
import Description from "@/components/form/Description";

const LocationForm = ({
  locationId,
  defaultImgList,
  currentImg,
  defaultPlaceId,
  defaultLat,
  defaultLng,
  defaultTitle,
  defaultAddress,
  defaultDescription,
  defaultCategory,
  defaultWeekdayTime,
  defaultWeekendTime,
  defaultPriceRange,
  onGetAPI,
}) => {
  const notifyCreate = () => toast.success("Successfully register!");
  const notifyUpdate = () => toast.success("Successfully update!");


  const [uploading, setUploading] = useState(false);
  const [isShowImage, setIsShowImage] = useState(false);
  const [imgList, setImgList] = useState(defaultImgList);
  const [image, setImage] = useState(currentImg);
  const [placeId, setPlaceId] = useState(defaultPlaceId);
  const [title, setTitle] = useState(defaultTitle);
  const [category, setCategory] = useState(defaultCategory);
  const [address, setAddress] = useState(defaultAddress);
  const [lat, setLat] = useState(defaultLat);
  const [lng, setLng] = useState(defaultLng);
  const [description, setDescription] = useState(defaultDescription);
  const [weekdayOpenTime, setWeekdayOpenTime] = useState(
    defaultWeekdayTime.openTime
  );
  const [weekdayCloseTime, setWeekdayCloseTime] = useState(
    defaultWeekdayTime.closeTime
  );
  const [weekendOpenTime, setWeekendOpenTime] = useState(
    defaultWeekendTime.openTime
  );
  const [weekendCloseTime, setWeekendCloseTime] = useState(
    defaultWeekendTime.closeTime
  );
  const [minPrice, setMinPrice] = useState(defaultPriceRange.min);
  const [maxPrice, setMaxPrice] = useState(defaultPriceRange.max);
  const [currency, setCurrency] = useState(defaultPriceRange.currency);

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

  const formatTime = (timeString) => {
    const hours = timeString.slice(0, 2);
    const minutes = timeString.slice(2, 4);

    return `${hours}:${minutes}`;
  };

  const avatarRef = useRef();
  useOnClickOutside(avatarRef, handleCloseImage);

  const onChangeLocationForm = (place, lat, lng) => {
    setPlaceId(place.place_id);
    setTitle(place.name);
    setAddress(place.formatted_address);
    setLat(lat);
    setLng(lng);
    setWeekdayOpenTime(formatTime(place.opening_hours.periods[0].open.time));
    setWeekdayCloseTime(formatTime(place.opening_hours.periods[0].close.time));
    if (place.opening_hours.periods.length > 5) {
      setWeekendOpenTime(formatTime(place.opening_hours.periods[5].open.time));
      setWeekendCloseTime(
        formatTime(place.opening_hours.periods[5].close.time)
      );
    }
  };

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

  // const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setPriceErr()
    setCurrencyErr()
    setSubmitErr([]);
    console.log(typeof minPrice)
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
        if ((minPrice && !maxPrice) || (!minPrice && maxPrice)) {
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
          setSubmitErr((prev) => [...prev, VALIDATE.price(minPrice, maxPrice)]);
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
            min: parseFloat(Number(minPrice.replace(/,/g, "")).toFixed(2)),
            max: parseFloat(Number(maxPrice.replace(/,/g, "")).toFixed(2)),
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
          if ((minPrice && !maxPrice) || (!minPrice && maxPrice)) {
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
          // console.log(typeof parseFloat(Number(minPrice.replace(/,/g, "")).toFixed(2)))
          // console.log(typeof parseFloat(parseFloat(Number(minPrice.replace(/,/g, "")).toFixed(2))))

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
              min: parseFloat(Number(minPrice.replace(/,/g, "")).toFixed(2)),
              max: parseFloat(Number(maxPrice.replace(/,/g, "")).toFixed(2)),
              currency: currency.title,
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
    if (window.location.pathname === "/create-location") {
      locationApi.createLocation(data, navigate, setSubmitErr, setIsShowPopup, notifyCreate);
      console.log(data);
      setIsLoading(false);

      return;
    } else {
      data = {
        locationId: locationId,
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
        pricePerPerson:
          minPrice && maxPrice && currency
            ? {
                min: parseFloat(Number(minPrice.replace(/,/g, "")).toFixed(2)),
                max: parseFloat(Number(maxPrice.replace(/,/g, "")).toFixed(2)),
                currency: currency.title,
              }
            : null,
        weekday: {
          openTime: weekdayOpenTime.replace(":", ""),
          closeTime: weekdayCloseTime.replace(":", ""),
        },
        weekend:
          weekendOpenTime && weekendCloseTime
            ? {
                openTime: weekendOpenTime.replace(":", ""),
                closeTime: weekendCloseTime.replace(":", ""),
              }
            : null,
      };
      locationApi.updateLocation(data, navigate, setSubmitErr, setIsShowPopup, notifyUpdate);
      console.log(data);
      setIsLoading(false);

      return;
    }
    // // // console.log(response)
    // setIsLoading(false);
  };

  useEffect(() => {
    if (imgList.length > 0) {
      setImgList([...imgList]);
    }
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={`${isShowImage && "overflow-hidden h-screen"}`}
      >
        <Wrapper col="true" className="justify-between w-full gap-4 my-8">
          <Wrapper className="" col="true">
            <AutoCompleteScreen
              label="Location"
              className={`bg-white h-[60px] !my-0 !py-2 ${
                addressErr &&
                (address.trim() !== ""
                  ? "focus:border-green-500 focus:ring-2 ring-1 focus:ring-green-500"
                  : "focus:!ring-secondary-400  !border-secondary-400 focus:ring-2 ring-1 ring-secondary-400")
              } ${
                address &&
                "focus:!border-green-500 focus:ring-1 focus:!ring-green-500 ring-1 ring-black"
              }`}
              address={address}
              setAddress={setAddress}
              // addressErr={addressErr}
              onChange={onChangeLocationForm}
            />
            {lat && lng && (
              <StaticMap
                title={title}
                width={"100%"}
                height={"60vh"}
                address={address}
                lat={lat}
                lng={lng}
              />
            )}
          </Wrapper>

          <Wrapper className="" col="true">
            <Label>
              Title <span className="text-secondary-400">*</span>
            </Label>
            <Input
              // label={`Title <span className="text-secondary-400">*</span>`}
              placeholder="Enter the place's name"
              className={`rounded-lg h-[60px] ${
                title &&
                "focus:!border-green-500 focus:ring-1 focus:!ring-green-500 ring-1 ring-black"
              }
                ${
                  titleErr &&
                  (title.trim() !== ""
                  ? "focus:border-green-500 focus:ring-2 ring-1 focus:ring-green-500"
                  : "focus:!ring-secondary-400  !border-secondary-400 focus:ring-2 ring-1 ring-secondary-400")
                }`}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
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
              setCategory(option);
            }}
            err={categoryErr}
            className={` 
              ${
                (category?.title || category) ? "focus:ring-2 ring-1 ring-black border-black"
                  : categoryErr && "focus:!ring-secondary-400 ring-1 !ring-secondary-400 focus:!border-secondary-400 border-secondary-400 "
              }`}
          />

          <Description 
            label="Description"
            optional
            wrapperClassName="!my-0"
            textareaClassName={
              description.trim() !== "" &&
              "focus:border-green-500 ring-1 ring-black focus:!ring-green-500 "
            }
            placeholder="Enter the description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <Wrapper col="true" className="gap-2 xl:flex-row ">
            <Wrapper col="true" className="gap-2 !w-full">
              <Label>
                Time <span className="text-secondary-400">*</span>
              </Label>

              <Wrapper
                col="true"
                className={`gap-2 ${width > 520 && "!flex-row "} w-full`}
              >
                <Wrapper className="flex-col gap-2 w-full">
                  <Label>Weekday:</Label>
                  <Wrapper className="gap-2 w-full justify-between">
                    <Time
                      required
                      label="Open time:"
                      onChange={(e) => {
                        setWeekdayOpenTime(e.target.value);
                      }}
                      value={weekdayOpenTime}
                      err={weekdayOpenTimeErr}
                    />
                    <Time
                      required
                      label="Close time:"
                      onChange={(e) => {
                        setWeekdayCloseTime(e.target.value);
                      }}
                      value={weekdayCloseTime}
                      err={weekdayCloseTimeErr}
                    />
                  </Wrapper>
                </Wrapper>

                {width >= 520 && <div className=" w-[1px] bg-black"></div>}

                <Wrapper className="flex-col gap-2 w-full">
                  <Label>
                    Weekend: <i>(Optional)</i>
                  </Label>

                  <Wrapper className="gap-2 w-full justify-between">
                    <Time
                      label="Open time:"
                      onChange={(e) => {
                        setWeekendOpenTime(e.target.value);
                      }}
                      value={weekendOpenTime}
                      err={weekendTimeErr}
                    />
                    <Time
                      label="Close time:"
                      onChange={(e) => {
                        setWeekendCloseTime(e.target.value);
                      }}
                      value={weekendCloseTime}
                      err={weekendTimeErr}
                    />
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <div className=" w-[1px] bg-black lg:block hidden"></div>

            <Wrapper col="true" className="justify-between !w-full">
              <Label>
                Price Range per person <i>(optional)</i>{" "}
              </Label>
              <Wrapper className="flex-col gap-4 sm:flex-row !w-full">
                <Wrapper className="justify-between gap-4 sm:justify-start !w-full">
                  <Price
                    label="From: "
                    value={minPrice}
                    onChange={(e) => {
                      setMinPrice(e.target.value);
                      setPriceErr(VALIDATE.price(e.target.value, maxPrice));
                    }}
                    className={`${priceErr ? "focus:!ring-secondary-400 focus:!border-secondary-400 !border-secondary-400 ring-1 !ring-secondary-400": ""}`}
                    err={priceErr}
                  />

                  <Price
                    label="To: "
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(e.target.value);
                      setPriceErr(VALIDATE.price(minPrice, e.target.value));
                    }}
                    className={`${priceErr ? "focus:!ring-secondary-400 focus:!border-secondary-400 !border-secondary-400 ring-1 !ring-secondary-400": ""}`}
                    err={priceErr}
                  />
                </Wrapper>

                <Dropdown
                  label="Currency:"
                  className={`${
                    (currency?.title || currency) ? "focus:ring-2 ring-1 ring-black border-black"
                      : currencyErr && "focus:!ring-secondary-400 ring-1 !ring-secondary-400 focus:!border-secondary-400 border-secondary-400 "
                  } rounded-lg `}
                  wrapperClassName="w-full"
                  options={currencyList}
                  value={currency}
                  defaultTitle={"SELECT CURRENCY"}
                  onChange={(option) => setCurrency(option)}
                  err={currencyErr}
                  dropdownClassName="!overflow-auto"
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
                    setImage();
                    setUploading(true);
                    // console.log(e.target.files[0])
                    // console.log(e.target.value)
                    if (e.target.files[0] === undefined) {
                      if (imgList.length > 0) {
                        setImage(imgList[imgList.length - 1]);
                      }
                      setUploading(false);
                      return;
                    }
                    if (VALIDATE.selectedImage(e.target.files[0])) {
                      if (imgList.length > 0) {
                        setImage(imgList[imgList.length - 1]);
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
                        setImage(response.data.image);
                        setImgList((prev) => [...prev, response.data.image]);
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

            {imgList.length > 0 && (
              <Slider
                src={image}
                className={`py-2 h-[24vh] items-center ${
                  imgList.length <= 0 && "invisible"
                }`}
                imgList={imgList}
                perView={width > 768 ? 4 : 2}
                setImgList={setImgList}
                setImage={setImage}
                loadMore={() => {}}
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
              className="!my-0 h-[60px] disabled:opacity-70"
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
          title={`${window.location.pathname === '/create-location' ? "Registering location" : "Updating loacation"}. Wait for a few seconds to be directed to the previous page`}
          children={<Loading />}
          className="!fixed"
          formClassName="items-center !h-fit"
          titleClassName="!text-green-500"
        />
      )}
    </>
  );
};

export default LocationForm;