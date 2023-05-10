import Button from "@/components/button/Button";
import Screen from "@/components/container/Screen";
import Wrapper from "@/components/wrapper/Wrapper";
import Label from "@/components/form/Label";
import React, { useState } from "react";
import Input from "@/components/form/Input";
import camera from "@/assets/camera.svg";
import location from "@/assets/location.svg";
import categoryList from "@/constants/category";
import Dropdown from "@/components/form/Dropdown";
import UploadImage from "@/components/image/UploadImage";
import useViewport from "@/hooks/useScreenWidth";
import PreviewImage from "@/components/image/PreviewImage";
import { useDispatch, useSelector } from "react-redux";
import { changeCategory, changeImage, changeAddress, changeDescription, changePrice, changeTitle } from "@/features/createLocationFormSlice";
import axios from "axios";
import { imageList } from "@/constants/images";

const CreateLocationScreen = () => {
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

    const [uploading, setUploading] = useState(false)
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
            localStorage.setItem("locationImage", response.data.image);
            setUploading(false);
          })
          .catch(function (response) {
            console.log(response);
            setUploading(false);
          });
      })();
    }
  // const {width} = useViewport()
  const dispatch = useDispatch();
  return (
    <Screen className="px-4">
      <form className="lg:flex gap-4 lg:my-4">
        <div className="w-full flex flex-col gap-4">
          <UploadImage
            className="!bg-transparent border border-dashed rounded-lg lg:my-0 h-full"
            icon={camera}
            locationImage={image}
            uploading={uploading}
            onChange={handleOnChangeImage}
          />
          <PreviewImage imageList={imageList} />
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
              className="rounded-lg"
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
            />
          </Wrapper>

          <Button className="mt-8 mb-0" primary active>
            Submit
          </Button>
        </Wrapper>
      </form>
    </Screen>
  );
};

export default CreateLocationScreen;
