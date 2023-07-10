import Label from "@/components/form/Label";
import Wrapper from "@/components/wrapper/Wrapper";
import React from "react";
import CurrencyFormat from "react-currency-format";

        //   (err
        //     ? " focus:!ring-secondary-400 !border-secondary-400 ring-1 ring-secondary-400"
        //     : "!border-black focus:!border-black !ring-black")
        // } 
        // ${err ? " focus:!ring-secondary-400 !border-secondary-400 ring-1 !ring-secondary-400" : ""} 
        
const Price = ({label, value, err, onChange, wrapperClassName, className}) => {
  return (
    <Wrapper col="true" className={`justify-between w-full ${wrapperClassName}`}>
      <Label>{label}</Label>

      <CurrencyFormat
        className={`rounded-lg !py-4 bg-white w-full border border-black focus:ring-1 focus:ring-primary-400 px-4 text-sm transition-all duration-300 outline-none md:text-base md:px-6 md:py-4 focus:border-primary-100 placeholder:text-secondary-100 ${
          value && "ring-1 ring-black focus:!ring-green-500 focus:!border-green-500" }

        ${className}`}
        value={value}
        thousandSeparator={true}
        onChange={onChange}
        placeholder="Enter the price"
        decimalScale={2}
        fixedDecimalScale={true}
        min={0}
      />
    </Wrapper>
  );
};

export default Price;
