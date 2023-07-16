import React from "react";
import Label from "./Label";
import Error from "./Error";

const DatePicker = ({
  onChange,
  label,
  err,
  required,
  id,
  className,
  defaultValue,
}) => {
  const handleKeyDown = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <div
        className={`relative flex flex-col ${
          label && "gap-1 md:gap-2 lg:gap-3"
        } ${className}`}
      >
        <Label htmlFor={id} required={required}>
          {label}
        </Label>

        <input
          value={defaultValue}
          onKeyDown={handleKeyDown}
          onChange={onChange}
          datepicker="true"
          datepicker-autohide="true"
          type="date"
          className={`!w-full resize-none border border-primary-400 focus:ring-1 focus:ring-primary-400 px-4 py-3 text-sm transition-all duration-300 outline-none rounded-lg md:text-base md:px-6 md:py-4 focus:border-primary-100 placeholder:text-secondary-100 ${className}`}
          placeholder="Select date"
        />

        {err && err !== "" && <Error fluid>{err}</Error>}
      </div>
    </div>
  );
};

export default DatePicker;
