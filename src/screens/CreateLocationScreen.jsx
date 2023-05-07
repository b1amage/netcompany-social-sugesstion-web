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
import { changeCategory } from "@/features/createLocationFormSlice";

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

  console.log(images, image, category, title, address, description, price);
  // const {width} = useViewport()
  const dispatch = useDispatch();
  return (
    <Screen className="px-4">
      <form className="lg:flex gap-4 lg:my-4">
        <div className="w-full">
          <UploadImage
            className="my-4 py-10 !bg-transparent border border-dashed rounded-lg lg:my-0"
            icon={camera}
          />
          {/* <PreviewImage /> */}
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
            />
          </Wrapper>

          <Wrapper className="" col>
            <Input
              label="Location"
              required
              icon={location}
              placeholder="Enter the address"
              className="rounded-lg"
            />
          </Wrapper>

          <Wrapper className="my-4" col>
            <Label>Description</Label>
            <textarea
              className="w-full h-[150px] focus:ring-1 focus:ring-primary-400 px-4 py-3 text-sm transition-all duration-300 outline-none rounded-lg bg-neutral-100 md:text-base md:px-6 md:py-4 focus:border-primary-100 placeholder:text-secondary-100 resize-none"
              placeholder="Enter the description"
            />
          </Wrapper>

          <Wrapper col className="">
            <Input
              label="Price"
              className="rounded-lg"
              type="number"
              required
            />
          </Wrapper>

          <Button className="my-8" primary active>
            Submit
          </Button>
        </Wrapper>
      </form>
    </Screen>
  );
};

export default CreateLocationScreen;
