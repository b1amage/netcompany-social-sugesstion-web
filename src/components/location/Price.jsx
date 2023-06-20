import Label from "@/components/form/Label";
import Wrapper from "@/components/wrapper/Wrapper";
import React from "react";
import CurrencyFormat from "react-currency-format";

const Price = ({label, value, err,onChange, wrapperClassName, className}) => {
  return (
    <Wrapper col="true" className={`justify-between ${wrapperClassName}`}>
      <Label>{label}</Label>

      <CurrencyFormat
        className={`rounded-lg !py-4 bg-white w-full border border-primary-400 focus:ring-1 focus:ring-primary-400 px-4 text-sm transition-all duration-300 outline-none md:text-base md:px-6 md:py-4 focus:border-primary-100 placeholder:text-secondary-100 ${
          value &&
          (err
            ? " focus:!ring-secondary-400  !border-secondary-400 focus:ring-2 ring-1 ring-secondary-400"
            : "!border-green-500 focus:ring-2 ring-1 focus:!ring-green-500 ring-green-500")
        } ${className}`}
        value={value}
        thousandSeparator={true}
        onChange={onChange}
        placeholder="Enter the price"
        decimalScale={2}
        fixedDecimalScale={true}
      />
    </Wrapper>
  );
};

export default Price;
