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
import VALIDATE from "@/helpers/validateForm";
import Error from "@/components/form/Error";
import Time from "@/components/location/Time";
import { useSearchParams } from "react-router-dom";
import question from "@/assets/question.svg"
import TimePicker from "@/components/form/TimePicker";
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
  dayTypeErr,
  setDayTypeErr,
  openTimeErr, 
  setOpenTimeErr,
  closeTimeErr, 
  setCloseTimeErr,
  submitErr,
  setSubmitErr,
  
}) => {
  const dayTypes = [{ title: "Weekday" }, { title: "Weekend" }];
  const handleDistanceChange = ({ x }) => setSearchDistanceValue(x);
  
  const [searchParams, setSearchParams] = useSearchParams();

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
      searchInput: searchParams.get("searchInput") || "",
      locationCategory:
        categoryValue !== "" ? categoryValue?.title || categoryValue : "",
      openFrom: openTime.replace(":", ""),
      closeTo: closeTime.replace(":", ""),
      dayType: dayType !== "" ? dayType?.title || dayType : "",
      searchDistance: searchDistanceValue || "",
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
    setSearchDistanceValue(JSON.parse(localStorage.getItem("user")).searchDistance); // replace with the default value
    setOpenTimeErr(null);
    setCloseTimeErr(null);
    setDayTypeErr(null);
    setSubmitErr(null);

    // searchParams.delete('searchInput')
    searchParams.delete("locationCategory");
    searchParams.delete("openFrom");
    searchParams.delete("closeTo");
    searchParams.delete("dayType");
    searchParams.delete("searchDistance");

    setSearchParams(searchParams);
    setIsFiltered(false);
    setIsClicked(false);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full relative">
      <Dropdown
        label="Category"
        defaultTitle="SELECT THE CATEGORY"
        options={categoryList}
        value={categoryValue}
        onChange={(option) => {
          setCategoryValue(option);
        }}
        openClassName="!ring-black ring-1 focus:ring-black !border-black"
        className={`!rounded-2xl ring-black ${categoryValue && `ring-1 `}`}
        dropdownClassName="!max-h-[250px]"
      />
      <Wrapper col="true" className="gap-2">
        <Label>Time</Label>

        <Wrapper col="true" className={`gap-2 w-full`}>
          <Wrapper col="true" className="gap-2 w-full">
            <Wrapper className="gap-2 w-full ">
              <Time
                label="Open From:"
                labelClassName="!text-[12px]"
                onChange={(e) => {
                  setOpenTime(e.target.value);
                }}
                value={openTime}
                err={openTimeErr}
                className=""
                wrapperClassName=""
              />
              <Time
                label="Close To:"
                labelClassName="!text-[12px]"
                onChange={(e) => {
                  setCloseTime(e.target.value);
                }}
                value={closeTime}
                err={closeTimeErr}
                className=""
                wrapperClassName=""
              />
            </Wrapper>
            <Wrapper col="true" className="w-full">
              <Label className="!text-[14px]">On:</Label>
              <Dropdown
                defaultTitle="DAY TYPE"
                options={dayTypes}
                value={dayType}
                onChange={(option) => {
                  setDayType(option);
                }}
                openClassName="!ring-black ring-1 focus:ring-black !border-black"
                className={`${
                  dayType?.title || dayType
                    ? "ring-1 ring-black border-black"
                    : dayTypeErr &&
                      "focus:!ring-secondary-400 ring-1 !ring-secondary-400 focus:!border-secondary-400 !border-secondary-400 "
                } !rounded-2xl`}
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
        label={`Distance: ${searchDistanceValue} km`}
        labelClassName="relative"
        isHint
        src={question}
      />

      <Wrapper col="true" className="">
        <Error fluid className={`${!submitErr && "invisible"}`}>
          {submitErr}
        </Error>

        <Wrapper>
          <Button
            type="button"
            onClick={handleResetFilter}
            primary
            className="!my-0 !bg-white border-primary-400 !border !text-primary-400 hover:!border-danger hover:!bg-danger hover:!text-white"
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
