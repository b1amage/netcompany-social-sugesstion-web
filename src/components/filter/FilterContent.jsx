import Dropdown from "@/components/form/Dropdown";
import categoryList from "@/constants/category";
import Input from "@/components/form/Input";
import Label from "@/components/form/Label";
import React, { useState } from "react";
import Wrapper from "@/components/wrapper/Wrapper";
import Range from "@/components/form/Range";
import { DISTANCE } from "@/constants/distance";
import Button from "@/components/button/Button";
import { useDispatch } from "react-redux";
import {
  changeSearchDistance,
  changeTime,
  changeCategory,
} from "@/features/filterSlice";
import VALIDATE from "@/helpers/validateForm";
import Error from "@/components/form/Error";

const FilterContent = ({
  setIsClicked,
  categoryValue,
  setCategoryValue,
  dayType,
  setDayType,
  openTime,
  setOpenTime,
  closeTime,
  setCloseTime,
  searchDistanceValue,
  setSearchDistanceValue,
}) => {
  
  const dayTypes = [{ title: "Weekday" }, { title: "Weekend" }];
  const [dayTypeErr, setDayTypeErr] = useState();
  const [openTimeErr, setOpenTimeErr] = useState();
  const [closeTimeErr, setCloseTimeErr] = useState();
  const [submitErr, setSubmitErr] = useState();
  const handleDistanceChange = ({ x }) => setSearchDistanceValue(x);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    setOpenTimeErr();
    setCloseTimeErr();
    setDayTypeErr();
    setSubmitErr();

    if (categoryValue) {
      dispatch(changeCategory(category.title));
    }

    if ((openTime && !closeTime) || (!openTime && closeTime)) {
      setOpenTimeErr(VALIDATE.time(openTime));
      setCloseTimeErr(VALIDATE.time(closeTime));
      setSubmitErr('Please fill both "Open from" and "On" fields!');
      return;
    }

    if (VALIDATE.category(dayType)) {
      setDayTypeErr(VALIDATE.category(dayType));
      setSubmitErr("Please select day type!");
      return;
    }

    dispatch(
      changeTime({
        openFrom: openTime.replace(":", ""),
        closeTo: closeTime.replace(":", ""),
        dayType: dayType.title,
      })
    );
    dispatch(changeSearchDistance(searchDistanceValue));
    
    setIsClicked(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Dropdown
        label="Category"
        defaultTitle="SELECT THE CATEGORY"
        options={categoryList}
        value={categoryValue}
        onChange={(option) => {
          setCategoryValue(option);
        }}
        className={`${
          categoryValue &&
          `!border-black focus:!border-black ring-1 !ring-black`
        }`}
        // err={categoryErr}
      />
      <Wrapper col="true" className="gap-2">
        <Label>Time</Label>

        <Wrapper col="true" className={`gap-2 w-full`}>
          <Wrapper className="flex-col gap-2 w-full">
            <Wrapper className="gap-4 w-full">
              <Wrapper col="true" className="w-full">
                <Label className="!text-[14px]">Open From:</Label>
                <Input
                  type="time"
                  className={`h-[60px] appearance-none flex justify-between !w-full bg-white  ${
                    openTimeErr
                      ? !openTime
                        ? "focus:!ring-secondary-400 !border-secondary-400 border-2"
                        : "ring-1 !border-black"
                      : "!border-black focus:!border-black !ring-black"
                  } ${
                    openTime &&
                    "!border-black focus:!border-black !ring-black ring-1 "
                  } !rounded-lg`}
                  onChange={(e) => {
                    setOpenTime(e.target.value);
                  }}
                    value={openTime}
                />
              </Wrapper>

              <Wrapper col="true" className="w-full">
                <Label className="!text-[14px]">Close to:</Label>
                <Input
                  type="time"
                  className={`h-[60px] appearance-none flex justify-between !w-full bg-white ${
                    closeTimeErr
                      ? !closeTime
                        ? "focus:!ring-secondary-400 !border-secondary-400 border-2"
                        : "ring-1 !border-black"
                      : "!border-black focus:!border-black !ring-black"
                  } ${
                    closeTime &&
                    "!border-black focus:!border-black !ring-black ring-1 "
                  } !rounded-lg`}
                  onChange={(e) => {
                    setCloseTime(e.target.value);
                  }}
                    value={closeTime}
                />
              </Wrapper>
            </Wrapper>
            <Wrapper col="true" className="w-full">
              <Label className="!text-[14px]">On:</Label>
              <Dropdown
                // label="On"
                defaultTitle="DAY TYPE"
                options={dayTypes}
                value={dayType}
                onChange={(option) => {
                  setDayType(option);
                }}
                className={`!border-black focus:!border-black !ring-black ${
                  !dayTypeErr
                    ? dayType?.title && "ring-1 !border-black"
                    : "focus:!ring-secondary-400  !border-secondary-400 focus:ring-2 ring-1 !ring-secondary-400"
                }`}
              />
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </Wrapper>
      <Range
        min={DISTANCE.min}
        max={DISTANCE.max}
        onChange={handleDistanceChange}
        x={searchDistanceValue}
        label={`Distance: ${searchDistanceValue}km`}
      />

      <Error fluid className={`mt-8 ${!submitErr && "invisible"}`}>
        {submitErr}
      </Error>
      <Button primary active className="!my-0">
        Submit
      </Button>
    </form>
  );
};

export default FilterContent;
