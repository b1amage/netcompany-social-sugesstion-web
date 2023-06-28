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
import { useSearchParams } from "react-router-dom";

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
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    if ((openTime && !closeTime) || (!openTime && closeTime)) {
      setOpenTimeErr(VALIDATE.time(openTime));
      setCloseTimeErr(VALIDATE.time(closeTime));
      setSubmitErr('Please fill both "Open from" and "Close to" fields!');
      return;
    }

    if (openTime && closeTime && !dayType) {
      setDayTypeErr(VALIDATE.category(dayType));
      setSubmitErr("Please select day type!");
      return;
    }

    if (dayType && !openTime && !closeTime) {
      setOpenTimeErr(VALIDATE.time(openTime));
      setCloseTimeErr(VALIDATE.time(closeTime));
      setSubmitErr('Please fill both "Open from" and "Close to" fields!');
      return;
    }

    setSearchParams({
      searchInput: searchParams.get('searchInput') || "",
      locationCategory: categoryValue ? categoryValue?.title : "",
      openFrom: openTime.replace(":", ""),
      closeTo: closeTime.replace(":", ""),
      dayType: dayType.title || "",
      searchDistance: searchDistanceValue || ""
    });

    setSubmitErr();
    setIsFiltered(true);
    setIsClicked(false);
  };

  const handleResetFilter = () => {
    setOpenTime("");
    setCloseTime("");
    setDayType("");
    setCategoryValue("");
    setSearchDistanceValue(null); // replace with the default value
    setOpenTimeErr(null);
    setCloseTimeErr(null);
    setDayTypeErr(null);
    setSubmitErr(null);

    searchParams.delete('searchInput')
    searchParams.delete('locationCategory')
    searchParams.delete('openFrom')
    searchParams.delete('closeTo')
    searchParams.delete('dayType')
    searchParams.delete('searchDistance')

    setSearchParams(searchParams);
    setIsFiltered(false);
    setIsClicked(false);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
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
                labelClassName="!text-[12px]"
                onChange={(e) => {
                  setOpenTime(e.target.value);
                }}
                value={openTime}
                err={openTimeErr}
              />
              <Time
                label="Close To:"
                labelClassName="!text-[12px]"
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
        label={`Distance: ${searchDistanceValue ? `${searchDistanceValue} km` : "(Not filter)"}`}
      />

      <Wrapper col="true" className="">
        <Error fluid className={`mt-4 ${!submitErr && "invisible"}`}>
          {submitErr}
        </Error>

        <Wrapper>
          <Button
            type="button"
            onClick={handleResetFilter}
            primary
            className="!my-0 !bg-white border-primary-400 !border !text-primary-400"
          >
            Reset
          </Button>
          <Button primary active className="!my-0">
            Apply
          </Button>
        </Wrapper>
      </Wrapper>
    </form>
  );
};

export default FilterContent;
