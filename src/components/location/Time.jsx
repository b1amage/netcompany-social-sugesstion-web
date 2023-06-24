import Input from "@/components/form/Input";
import Label from "@/components/form/Label";
import Wrapper from "@/components/wrapper/Wrapper";
import React from "react";

const Time = ({
  value,
  onChange,
  wrapperClassName,
  className,
  label,
  labelClassName,
  err,
  required,
}) => {
  return (
    <Wrapper col="true" className={`w-full ${wrapperClassName}`}>
      <Label className={`!text-[14px] ${labelClassName}`}>
        {label} {required && <span className="text-secondary-400">*</span>}
      </Label>
      <Input
        type="time"
        className={`h-[60px] appearance-none flex justify-between !w-full bg-white 
        ${value 
          ? "ring-1 ring-black focus:!ring-green-500 focus:!border-green-500 "
          : err ? "focus:!ring-secondary-400 !border-secondary-400 ring-1 ring-secondary-400"
        : "!border-black focus:!border-black !ring-black"
    } ${
      value && "!border-black focus:!border-black !ring-black ring-1 "
    } ${className}`}
        onChange={onChange}
        value={value}
      />
    </Wrapper>
  );
};

export default Time;
