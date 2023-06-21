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
  changeWeekdayTime,
  changeWeekendTime,
  changeCategory
} from "@/features/filterSlice";
import VALIDATE from "@/helpers/validateForm";
import Error from "@/components/form/Error";

const FilterContent = ({ setIsClicked }) => {
  const [category, setCategory] = useState();
  const [weekdayOpenTime, setWeekdayOpenTime] = useState("");
  const [weekdayCloseTime, setWeekdayCloseTime] = useState("");
  const [weekendOpenTime, setWeekendOpenTime] = useState("");
  const [weekendCloseTime, setWeekendCloseTime] = useState("");
  const [searchDistance, setSearchDistance] = useState(5);
  const [weekdayOpenTimeErr, setWeekdayOpenTimeErr] = useState();
  const [weekdayCloseTimeErr, setWeekdayCloseTimeErr] = useState();
  const [weekendOpenTimeErr, setWeekendOpenTimeErr] = useState();
  const [weekendCloseTimeErr, setWeekendCloseTimeErr] = useState();
  const [submitErr, setSubmitErr] = useState();
  const handleDistanceChange = ({ x }) => setSearchDistance(x);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      (weekdayOpenTime && !weekdayCloseTime) ||
      (!weekdayOpenTime && weekdayCloseTime)
    ) {
      setWeekdayOpenTimeErr(VALIDATE.time(weekdayOpenTime));
      setWeekdayCloseTimeErr(VALIDATE.time(weekdayCloseTime));
      setSubmitErr('Please fill both open and close time in "Weekday"!');
      return;
    }
    if (
      (weekendOpenTime && !weekendCloseTime) ||
      (!weekendOpenTime && weekendCloseTime)
    ) {
      setWeekendOpenTimeErr(VALIDATE.time(weekendOpenTime));
      setWeekendCloseTimeErr(VALIDATE.time(weekendCloseTime));
      setSubmitErr('Please fill both open and close time in "Weekend"!');
      return;
    }
    dispatch(
      changeWeekdayTime({
        openTime: weekdayOpenTime.replace(":", ""),
        closeTime: weekdayCloseTime.replace(":", ""),
      })
    );
    dispatch(
      changeWeekendTime({
        openTime: weekendOpenTime.replace(":", ""),
        closeTime: weekendCloseTime.replace(":", ""),
      })
    );
    dispatch(changeSearchDistance(searchDistance));
    if(category){
      dispatch(changeCategory(category.title))
    }
    setIsClicked(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Dropdown
        label="Category"
        defaultTitle="SELECT THE CATEGORY"
        options={categoryList}
        value={category}
        onChange={(option) => {
          setCategory(option);
        }}
        className={`!border-black ${category && " ring-0 "} focus:!ring-black  focus:!ring-1 !ring-black`}
        // err={categoryErr}
      />
      <Wrapper col="true" className="gap-2">
        <Label>Time</Label>

        <Wrapper col="true" className={`gap-2 w-full`}>
          <Wrapper className="flex-col gap-2 w-full">
            <Label>Weekday:</Label>
            <Wrapper className="gap-4 w-full">
              <Wrapper col="true" className="w-full">
                <Label className="!text-[14px]">Open time:</Label>
                <Input
                  type="time"
                  className={`h-[60px] appearance-none flex justify-between !w-full bg-white ${
                    weekdayOpenTimeErr &&
                    !weekdayOpenTime &&
                    "focus:!ring-secondary-400 !border-secondary-400 border-2"
                  }`}
                  onChange={(e) => {
                    setWeekdayOpenTime(e.target.value);
                  }}
                  //   value={weekdayOpenTime}
                />
              </Wrapper>

              <Wrapper col="true" className="w-full">
                <Label className="!text-[14px]">Close time:</Label>
                <Input
                  type="time"
                  className={`h-[60px] appearance-none flex justify-between bg-white !w-full ${
                    weekdayCloseTimeErr &&
                    !weekdayCloseTime &&
                    "focus:!ring-secondary-400 !border-secondary-400 border-2"
                  }`}
                  onChange={(e) => {
                    setWeekdayCloseTime(e.target.value);
                  }}
                  //   value={weekdayCloseTime}
                />
              </Wrapper>
            </Wrapper>
          </Wrapper>

          <Wrapper className="flex-col gap-2 w-full">
            <Label>Weekend:</Label>

            <Wrapper className="gap-4">
              <Wrapper col="true" className="!w-full">
                <Label className="!text-[14px]">Open time:</Label>
                <Input
                  type="time"
                  className={`h-[60px] appearance-none !w-full flex justify-between bg-white ${
                    weekendOpenTimeErr &&
                    !weekendOpenTime &&
                    "focus:!ring-secondary-400 !border-secondary-400 border-2"
                  }`}
                  onChange={(e) => {
                    setWeekendOpenTime(e.target.value);
                    // setWeekendTimeErr(VALIDATE.time(e.target.value))
                  }}
                  //   value={weekendOpenTime}
                />
              </Wrapper>

              <Wrapper col="true" className="w-full">
                <Label className="!text-[14px]">Close time:</Label>
                <Input
                  type="time"
                  className={`h-[60px] appearance-none !w-full flex justify-end bg-white ${
                    weekendCloseTimeErr &&
                    !weekendCloseTime &&
                    "focus:!ring-secondary-400 !border-secondary-400 border-2"
                  }`}
                  onChange={(e) => {
                    setWeekendCloseTime(e.target.value);
                  }}
                  //   value={weekendCloseTime}
                />
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </Wrapper>
      <Range
        min={DISTANCE.min}
        max={DISTANCE.max}
        onChange={handleDistanceChange}
        x={searchDistance}
        label={`Distance: ${searchDistance}km`}
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
