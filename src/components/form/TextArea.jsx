import Wrapper from "@/components/wrapper/Wrapper";
import React from "react";
import Label from "./Label";
import Error from "./Error";

const TextArea = ({ label, required, id, err, placeholder, onChange, rows, _ref,className, value, wrapperClassName, }) => {
  return (
    <Wrapper col="true" className={`${wrapperClassName}`}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>

      <textarea
        ref={_ref}
        value={value}
        className={`!w-full resize-none border border-primary-400 focus:ring-1 focus:ring-primary-400 px-4 py-3 text-sm transition-all duration-300 outline-none rounded-lg md:text-base md:px-6 md:py-4 focus:border-primary-100 placeholder:text-secondary-100 ${className}`}
        rows={rows || 4}
        // cols="50"
        placeholder={placeholder}
        onChange={e => {
          onChange(e);
        }}
      >
      </textarea>

      {err && err !== "" && <Error fluid>{err}</Error>}
    </Wrapper>
  );
};

export default TextArea;