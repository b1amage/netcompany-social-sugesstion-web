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
  resetFilter,
} from "@/features/filterSlice";
import VALIDATE from "@/helpers/validateForm";
import Error from "@/components/form/Error";
import Time from "@/components/location/Time";

const FilterContent = ({
  setIsFiltered,
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

    if (categoryValue) {
      dispatch(changeCategory(categoryValue));
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
    } else{
      if (!openTime && !closeTime){
        setOpenTimeErr(VALIDATE.time(openTime));
        setCloseTimeErr(VALIDATE.time(closeTime));
        setSubmitErr("Please fill both open and close time!");
        dispatch(
          changeTime({
            openFrom: openTime.replace(":", ""),
            closeTo: closeTime.replace(":", ""),
            dayType: dayType,
          })
        );
        return
      }
    }

    dispatch(
      changeTime({
        openFrom: openTime.replace(":", ""),
        closeTo: closeTime.replace(":", ""),
        dayType: dayType,
      })
    );
    dispatch(changeSearchDistance(searchDistanceValue));
    setSubmitErr();
    setIsFiltered(true);
    setIsClicked(false);
  };

  const handleResetFilter = () => {
    setOpenTime("");
    setCloseTime("");
    setDayType("");
    setCategoryValue("");
    setSearchDistanceValue(DISTANCE.min); // replace with the default value
    setOpenTimeErr(null);
    setCloseTimeErr(null);
    setDayTypeErr(null);
    setSubmitErr(null);

    dispatch(changeCategory(""));

    dispatch(
      changeTime({
        openFrom: "",
        closeTo: "",
        dayType: "",
      })
    );
    dispatch(changeSearchDistance());

    setIsFiltered(false);
    // setIsClicked(false);
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
        className={`ring-black ${categoryValue && `ring-1 `}`}
      />
      <Wrapper col="true" className="gap-2">
        <Label>Time</Label>

        <Wrapper col="true" className={`gap-2 w-full`}>
          <Wrapper className="flex-col gap-2 w-full">
            <Wrapper className="gap-4 w-full">
              <Time
                label="Open From:"
                onChange={(e) => {
                  setOpenTime(e.target.value);
                }}
                value={openTime}
                err={openTimeErr}
              />
              <Time
                label="Close To:"
                onChange={(e) => {
                  setCloseTime(e.target.value);
                }}
                value={closeTime}
                err={closeTimeErr}
              />
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
                className={`${
                  dayType?.title || dayType
                    ? "ring-1 ring-black border-black"
                    : dayTypeErr &&
                      "focus:!ring-secondary-400 ring-1 !ring-secondary-400 focus:!border-secondary-400 !border-secondary-400 "
                }`}
                // err={dayTypeErr}
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

      <Error fluid className={`mt-4 ${!submitErr && "invisible"}`}>
        {submitErr}
      </Error>
      <Button primary active className="!my-0">
        Submit
      </Button>
      <Button
        type="button"
        onClick={handleResetFilter}
        primary
        className="!my-0 bg-danger"
      >
        Reset
      </Button>
    </form>
  );
};

export default FilterContent;
