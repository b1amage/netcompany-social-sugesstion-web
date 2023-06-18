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
import { changeSearchDistance, changeWeekdayTime, changeWeekendTime } from "@/features/filterSlice";

const FilterContent = () => {
//   const [category, setCategory] = useState();
  const [weekdayOpenTime, setWeekdayOpenTime] = useState();
  const [weekdayCloseTime, setWeekdayCloseTime] = useState();
  const [weekendOpenTime, setWeekendOpenTime] = useState();
  const [weekendCloseTime, setWeekendCloseTime] = useState();
  const [searchDistance, setSearchDistance] = useState(5)
  const handleDistanceChange = ({ x }) => setSearchDistance(x);

  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(changeWeekdayTime({openTime: weekdayOpenTime, closeTime: weekdayCloseTime}))
    dispatch(changeWeekendTime({openTime: weekendOpenTime, closeTime: weekendCloseTime}))
    dispatch(changeSearchDistance(searchDistance))
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* <Dropdown
        label="Category"
        defaultTitle="SELECT THE CATEGORY"
        options={categoryList}
        value={category}
        onChange={(option) => {
          setCategory(option);
        }}
      /> */}
      <Wrapper col="true" className="gap-2">
        <Label>
          Time
        </Label>

        <Wrapper
          col="true"
          className={`gap-2 w-full`}
        >
          <Wrapper className="flex-col gap-2 w-full">
            <Label>Weekday:</Label>
            <Wrapper className="gap-4 w-full">
              <Wrapper col="true" className="w-full">
                <Label className="!text-[14px]">
                  Open time:
                </Label>
                <Input
                  type="time"
                  className={`h-[60px] appearance-none flex justify-between !w-full bg-white`}
                  onChange={(e) => {
                    setWeekdayOpenTime(e.target.value);
                  }}
                //   value={weekdayOpenTime}
                />
              </Wrapper>

              <Wrapper col="true" className="w-full">
                <Label className="!text-[14px]">
                  Close time: 
                </Label>
                <Input
                  type="time"
                  className={`h-[60px] appearance-none flex justify-between bg-white !w-full`}
                  onChange={(e) => {
                    setWeekdayCloseTime(e.target.value);
                  }}
                //   value={weekdayCloseTime}
                />
              </Wrapper>
            </Wrapper>
          </Wrapper>

          <Wrapper className="flex-col gap-2 w-full">
            <Label>
              Weekend:
            </Label>

            <Wrapper className="gap-4">
              <Wrapper col="true" className="!w-full">
                <Label className="!text-[14px]">Open time:</Label>
                <Input
                  type="time"
                  className={`h-[60px] appearance-none !w-full flex justify-between bg-white`}
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
                  className={`h-[60px] appearance-none !w-full flex justify-end bg-white`}
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
      <Button primary active className="mt-8 mb-0">Submit</Button>
    </form>
  );
};

export default FilterContent;
