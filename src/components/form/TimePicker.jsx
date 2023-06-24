import React from "react";
import Label from "./Label";
import Error from "./Error";

const TimePicker = ({ onChange, label, id, required, err }) => {
  return (
    <div className={`flex flex-col  ${label && "gap-1 md:gap-2 lg:gap-3"}`}>
      <Label required={required} htmlFor={id}>
        {label}
      </Label>
      <input
        className="w-full px-4 py-3 text-sm transition-all duration-300 border rounded-lg outline-none border-primary-400 focus:ring-1 focus:ring-primary-400 md:text-base md:px-6 md:py-4 focus:border-primary-100 placeholder:text-secondary-100"
        id="time"
        type="time"
        onChange={onChange}
      />

      {err && err !== "" && <Error fluid>{err}</Error>}
    </div>
  );
};

export default TimePicker;