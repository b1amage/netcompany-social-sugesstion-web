import Input from "@/components/form/Input";
import Label from "@/components/form/Label";
import Wrapper from "@/components/wrapper/Wrapper";
import React from "react";

const Time = ({value, onChange, wrapperClassName, className, label, labelClassName, err, required}) => {
  return (
    <Wrapper col="true" className={`w-full ${wrapperClassName}`}>
      <Label className={`!text-[14px] ${labelClassName}`}>
        {label} {required && <span className="text-secondary-400">*</span>}
      </Label>
      <Input
        type="time"
        className={`h-[60px] appearance-none flex justify-between !w-full bg-white ${
          value &&
          "!border-green-500 focus:ring-2 ring-1 focus:!ring-green-500 ring-green-500"
        } ${
          err &&
          (value
            ? "!border-green-500 focus:ring-2 ring-1 focus:!ring-green-500 ring-green-500"
            : "focus:!ring-secondary-400 !border-secondary-400 border-2")
        } ${className}`}
        onChange={onChange}
        value={value}
      />
    </Wrapper>
  );
};

export default Time;
