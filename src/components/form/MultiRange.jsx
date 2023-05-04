import React from "react";
import MultiRangeSlider from "multi-range-slider-react";
import { RANGE_SLIDER_DEFAULT_PROPS } from "@/constants/defaultProps";

const MultiRange = () => {
  return (
    <div>
      <MultiRangeSlider
        onInput={(e) => {
          console.log(e.minValue);
          console.log(e.maxValue);
        }}
        onChange={(e) => {
          console.log(e.minValue);
          console.log(e.maxValue);
        }}
        {...RANGE_SLIDER_DEFAULT_PROPS}
      />
    </div>
  );
};

export default MultiRange;
