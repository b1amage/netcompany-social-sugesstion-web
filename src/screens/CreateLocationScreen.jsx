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
  changePrice,
  changeTitle,
  addImage
} from "@/features/createLocationFormSlice";
import axios from "axios";
import { imageList } from "@/constants/images";
import { onSubmitForm} from "@/features/createLocationFormSlice";
import Portal from "@/components/HOC/Portal";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import Image from "@/components/image/Image";

const CreateLocationScreen = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [isShowImage, setIsShowImage] = useState(false);
  const screen = document.getElementById('root')
  const handleShowImage = () => {
    setIsShowImage(true)
    screen.style.overflow = 'hidden'
    screen.style.height = '100vh'
  }  
  const handleCloseImage = () => {
    setIsShowImage(false);
    screen.style.overflow = 'auto'
    screen.style.height = 'auto'
  }

  const avatarRef = useRef();
  useOnClickOutside(avatarRef, handleCloseImage);

  const { images, image, category, title, address, description, price } =
    useSelector(({ createLocationForm }) => {
      return {
        images: createLocationForm.images,
        image: createLocationForm.image,
        category: createLocationForm.category,
        title: createLocationForm.title,
        address: createLocationForm.address,
        description: createLocationForm.description,
        price: createLocationForm.price,
      };
    });

  const handleSlider = (index) => {
    setImgIndex(imgIndex + index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      images: images,
      category: category,
      title: title,
      address: address,
      description: description,
      price: price,
    };
    console.log(data)
    dispatch(onSubmitForm(data))
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
          dispatch(addImage(response.data.image))
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
    <Screen className={`px-4`}>
    <form  onSubmit={handleSubmit} className={`lg:flex gap-8 lg:my-4 ${isShowImage && 'overflow-hidden h-screen'}`}>
        <div className="w-full flex flex-col gap-4">
          <UploadImage
            className="!bg-transparent border border-dashed rounded-lg lg:my-0 h-full"
            icon={camera}

            uploading={uploading}
            onChange={handleOnChangeImage}
          />
          <PreviewImage
            className=''
            imageList={images}
            index={imgIndex}
            onClick={handleSlider}
            onClickImage={handleShowImage}
          />
        </div>

        <Wrapper col className="w-full">
          <Dropdown
            label="Category"
            options={categoryList}
            value={category}
            onChange={(option) => dispatch(changeCategory(option))}
          />

          <Wrapper className="my-4" col>
            <Input
              label="Title"
              required
              placeholder="Enter the place's name"
              className="rounded-lg"
              value={title}
              onChange={(e) => dispatch(changeTitle(e.target.value))}
            />
          </Wrapper>

          <Wrapper className="" col>
            <Input
              label="Location"
              required
              icon={location}
              placeholder="Enter the address"
              className="rounded-lg !pr-12"
              value={address}
              onChange={(e) => dispatch(changeAddress(e.target.value))}
            />
          </Wrapper>

          <Wrapper className="my-4" col>
            <Label>Description</Label>
            <textarea
              className="w-full h-[150px] focus:ring-1 focus:ring-primary-400 px-4 py-3 text-sm transition-all duration-300 outline-none rounded-lg bg-neutral-100 md:text-base md:px-6 md:py-4 focus:border-primary-100 placeholder:text-secondary-100 resize-none"
              placeholder="Enter the description"
              value={description}
              onChange={(e) => dispatch(changeDescription(e.target.value))}
            />
          </Wrapper>

          <Wrapper col className="">
            <Input
              label="Price"
              className="rounded-lg"
              type="number"
              required
              value={price}
              onChange={(e) => dispatch(changePrice(e.target.value))}
              min={0}
            />
          </Wrapper>

          <Button className="mt-8 mb-0" primary active>
            Submit
          </Button>
        </Wrapper>
      </form>
      {isShowImage && (
        <Portal location="body">
          <div className="absolute z-[9999] h-fit bg-black bg-opacity-80 flex-center cursor-pointer px-12 py-8 top-0">
            <Image
              _ref={avatarRef}
              src={images[imgIndex]}
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
