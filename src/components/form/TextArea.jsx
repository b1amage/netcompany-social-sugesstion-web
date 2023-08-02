import Wrapper from "@/components/wrapper/Wrapper";
import React, { useEffect, useImperativeHandle, useRef } from "react";
import Label from "./Label";
import Error from "./Error";

const TextArea = ({ label, required, id, err, placeholder, onChange, rows, className, value, _ref, wrapperClassName, onReset }) => {

  useEffect(() => {
      _ref.current.style.height = 'auto';
      _ref.current.style.height = _ref.current.scrollHeight + 'px';
  
  }, [_ref.current]);
  
  useEffect(() => {
    const currentHeight = parseInt(_ref.current.style.height, 10);
    console.log(currentHeight)
    if (currentHeight <= 150){
      _ref.current.style.overflowY = "hidden"
    } else{
      _ref.current.style.overflowY = "scroll"
    }
    
  }, [value])

  useEffect(() => {
    if (onReset){
      _ref.current.style.height = 'auto';
    }
  },[onReset])
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
          e.target.style.height = 'auto';
          e.target.style.height = e.target.scrollHeight + 'px';
        }}
      >
      </textarea>
      
      {err && err !== "" && <Error fluid>{err}</Error>}
    </Wrapper>
  );
};

export default TextArea;
