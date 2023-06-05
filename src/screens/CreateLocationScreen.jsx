import Button from "@/components/button/Button";
import Screen from "@/components/container/Screen";
import Wrapper from "@/components/wrapper/Wrapper";
import Label from "@/components/form/Label";
import React, { useRef, useState } from "react";
import Input from "@/components/form/Input";
import camera from "@/assets/camera.svg";
import location from "@/assets/location.svg";
import categoryList from "@/constants/category";
import Dropdown from "@/components/form/Dropdown";
import UploadImage from "@/components/image/UploadImage";
import useViewport from "@/hooks/useScreenWidth";
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
import Map from "@/components/map/Map";
import { currencyList } from "@/constants/currencyList";
import Heading from "@/components/typography/Heading";
import StaticMap from "@/test/StaticMap";
import AutoCompleteScreen from "@/test/AutoComplete";
// import { imageList } from "constants/images";

const CreateLocationScreen = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [isShowImage, setIsShowImage] = useState(false);
  const screen = document.getElementById("root");

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
    const data = {
      name: title,
      address: address,
      description: description,
      imageUrls: images,
      locationCategory: category.title,
      location: {
        type: "Point",
        coordinates: [lat, lng],
      },
      pricePerPerson: {
        min: minPrice,
        max: maxPrice,
        currency: currency.value,
      },
      weekday: {
        openTime: weekdayOpenTime.replace(":", ''),
        closeTime: weekdayCloseTime.replace(":", ''),
      },
      weekend: {
        openTime: weekendOpenTime.replace(":", ''),
        closeTime: weekendCloseTime.replace(":", ''),
      },
    };
    console.log(data);
    dispatch(onSubmitForm(data));
  };

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
          localStorage.setItem("locationImage", response.data.image);
          setUploading(false);
        })
        .catch(function (response) {
          console.log(response);
          setUploading(false);
        });
    })();
  };
  // const {width} = useViewport()
  const dispatch = useDispatch();
  return (
    <Screen className={`px-4 py-8`}>
      <form
        onSubmit={handleSubmit}
        className={`xl:flex gap-8 lg:my-4 my-12 ${
          isShowImage && "overflow-hidden h-screen"
        }`}
      >
        <div className="w-full xl:max-w-[40vw] flex flex-col gap-4 h-auto">
          <Wrapper className="justify-between">
            <Heading className="w-full items-center flex">
              Create Location form
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

          {images.length > 0 && (
            <PreviewImage
              className=""
              src={image}
              imageList={images}
              index={imgIndex}
              onClickImage={handleShowImage}
            />
          )}
        </div>

        <Wrapper col className="w-full my-4 xl:my-0 justify-between">
          <Dropdown
            label="Category"
            required
            defaultTitle="SELECT THE CATEGORY"
            options={categoryList}
            value={category}
            onChange={(option) => dispatch(changeCategory(option))}
          />

          <Wrapper className="my-4" col>
            <Input
              label="Title"
              required
              placeholder="Enter the place's name"
              className={`rounded-lg ${title && "bg-neutral-100"}`}
              value={title}
              onChange={(e) => dispatch(changeTitle(e.target.value))}
            />
          </Wrapper>

          <Wrapper className="" col>
            {/* <Input
              label="Location"
              required
              icon={location}
              placeholder="Enter the address"
              className={`rounded-lg !pr-12 ${address && "bg-neutral-100"}`}
              value={address}
              onChange={(e) => dispatch(changeAddress(e.target.value))}
            /> */}

            <AutoCompleteScreen />
            {/* <StaticMap
                title={title}
                width={500}
                height={300}
                address="720 Nguyen Van Linh"
                lat={lat}
                lng={lng}
              /> */}
          </Wrapper>

          <Wrapper className="my-4" col>
            <Label required>Description</Label>
            <textarea
              className={`w-full h-[150px] focus:ring-1 focus:ring-primary-400 px-4 py-3 text-sm transition-all duration-300 outline-none rounded-lg border border-black ${
                description && "bg-neutral-100"
              } md:text-base md:px-6 md:py-4 focus:border-primary-100 placeholder:text-secondary-100 resize-none`}
              placeholder="Enter the description"
              value={description}
              onChange={(e) => dispatch(changeDescription(e.target.value))}
            />
          </Wrapper>

          <Wrapper col className=" gap-4">
            <Label required>Calendar</Label>
            <Wrapper className="justify-between">
              <Input
                label="Day"
                value="Weekday"
                className="h-[60px]"
                disabled
              />
              <Wrapper className="">
                <Input
                  label="Open time"
                  type="time"
                  className="!w-fit h-[60px]"
                  onChange={(e) =>
                    dispatch(changeWeekdayOpenTime(e.target.value))
                  }
                  value={weekdayOpenTime}
                  // onChange={() => console.log(e.target.value)}
                />
                <Input
                  label="Close time"
                  type="time"
                  className="!w-fit h-[60px]"
                  onChange={(e) =>
                    dispatch(changeWeekdayCloseTime(e.target.value))
                  }
                  value={weekdayCloseTime}
                  // onChange={() => console.log(e.target.value)}
                />
              </Wrapper>
            </Wrapper>

            <Wrapper className="justify-between">
              <Input
                label="Day"
                value="Weekend"
                className="h-[60px]"
                disabled
              />
              <Wrapper className="">
                <Input
                  label="Open time"
                  type="time"
                  className="!w-fit h-[60px]"
                  onChange={(e) =>
                    dispatch(changeWeekendOpenTime(e.target.value))
                  }
                  value={weekendOpenTime}
                  // onChange={() => console.log(e.target.value)}
                />
                <Input
                  label="Close time"
                  type="time"
                  className="!w-fit h-[60px]"
                  onChange={(e) =>
                    dispatch(changeWeekendCloseTime(e.target.value))
                  }
                  value={weekendCloseTime}
                  // onChange={() => console.log(e.target.value)}
                />
              </Wrapper>
            </Wrapper>
          </Wrapper>

          <Wrapper col className="my-4">
            <Label>
              Price per person <i>(optional)</i>{" "}
            </Label>
            <Wrapper className="justify-between">
              <Input
                label="From: "
                className="rounded-lg w-full"
                type="number"
                value={minPrice}
                onChange={(e) => dispatch(changeMinPrice(e.target.value))}
                min={0}
                placeholder="Enter the price"
              />
              <Input
                label="To: "
                className="rounded-lg w-full"
                type="number"
                value={maxPrice}
                onChange={(e) => dispatch(changeMaxPrice(e.target.value))}
                min={minPrice}
                placeholder="Enter the price"
              />
              <Dropdown
                label="Currency"
                className="w-fit rounded-lg h-fit"
                options={currencyList}
                value={currency}
                defaultTitle={currency}
                onChange={(option) => dispatch(changeCurrency(option))}
              />
            </Wrapper>
          </Wrapper>

          <Button className="mt-8 mb-0" primary active>
            Submit
          </Button>
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