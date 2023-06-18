import React from "react";
import Label from "./Label";
import Error from "./Error";
import inputState from "@/constants/inputState";

const DatePicker = ({ onChange, label, err, required, id, className }) => {
  console.log("date picker", err);
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
        {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div> */}
        <input
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
