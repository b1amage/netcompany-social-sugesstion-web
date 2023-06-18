import React, { useState } from "react";
import Wrapper from "@/components/wrapper/Wrapper";
import Image from "@/components/image/Image";
import filter from "@/assets/filter.svg";
import Button from "@/components/button/Button";
import Popup from "@/components/popup/Popup";
import FilterContent from "./FilterContent";
import Heading from '@/components/typography/Heading'

const Filter = () => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <Wrapper>
      <Button className="!bg-none" onClick={() => setIsClicked(true)}>
        <Image
          imageClassName=""
          src={filter}
          alt="filter"
          className="w-[28px] h-[28px] m-2"
        />
      </Button>
      
        <Popup
          onClose={() => setIsClicked(false)}
          actions={[]}
          children={
            <Wrapper col="true" className="w-full px-4 py-6">
                <Heading className="text-center text-[36px]">Filter</Heading>
                < FilterContent
                />
            </Wrapper>
          }
          className={`${
            isClicked ? "translate-y-0" : "translate-y-full"
          } duration-300 items-end`}
          formClassName="h-[80vh] w-full !py-0"
          titleClassName="text-[20px]"
          childrenClassName="!mt-0 w-full "
          // setShowPopup={setShowAutoComplete}
        />
    
    </Wrapper>
  );
};

export default Filter;
