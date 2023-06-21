import React, { useState } from "react";
import Wrapper from "@/components/wrapper/Wrapper";
import Image from "@/components/image/Image";
import filter from "@/assets/filter.svg";
import Button from "@/components/button/Button";
import Popup from "@/components/popup/Popup";
import FilterContent from "./FilterContent";
import Heading from '@/components/typography/Heading'

const Filter = ({wrapperClassName, className}) => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <Wrapper className={`w-full ${wrapperClassName}`}>
      <Button className={`!bg-transparent !p-0 !border-none ${className}`} onClick={() => setIsClicked(true)}>
        <Image
          imageClassName=""
          src={filter}
          alt="filter"
          className="w-[28px] h-[28px]"
        />
      </Button>
      
        <Popup
          onClose={() => setIsClicked(false)}
          actions={[]}
          children={
            <Wrapper col="true" className="w-full px-4 py-3 ">
                <Heading className="text-center !text-[36px]">Filter</Heading>
                < FilterContent
                  setIsClicked={setIsClicked}
                />
            </Wrapper>
          }
          className={`${
            isClicked ? "translate-y-0" : "translate-y-full"
          } duration-300 items-end md:items-center`}
          formClassName="!h-auto w-full justify-center !py-0 "
          titleClassName="text-[20px]"
          childrenClassName="!mt-0 w-full"
          // setShowPopup={setShowAutoComplete}
        />
    
    </Wrapper>
  );
};

export default Filter;
