import React from "react";
import Label from "./Label";
import Wrapper from "@/components/wrapper/Wrapper";
import SubHeading from "@/components/typography/SubHeading";

const Description = ({
  label,
  value,
  optional,
  onChange,
  labelClassName,
  textareaClassName,
  wrapperClassName,
  placeholder,
  counter,
  maxWordCount
}) => {
  return (
    <Wrapper className={`my-4 ${wrapperClassName} w-full`} col="true">
      <Wrapper className="justify-between ">
        <Label className={labelClassName}>
          {label} {optional && <i>(optional)</i>}
        </Label>
        {counter && <SubHeading className=" px-4 !text-[20px] !text-black">
          {value.length}/{maxWordCount}
        </SubHeading>}
      </Wrapper>

      <textarea
        className={`w-full bg-white h-[150px] focus:ring-1 focus:ring-primary-400 px-4 py-3 text-sm transition-all duration-300 outline-none rounded-lg border border-black md:text-base md:px-6 md:py-4 focus:border-primary-100 placeholder:text-secondary-100 resize-none ${textareaClassName}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </Wrapper>
  );
};

export default Description;
