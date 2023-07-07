import React, { useState } from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import toast from "react-hot-toast";
import Wrapper from "@/components/wrapper/Wrapper";
import Heading from "@/components/typography/Heading";
import Image from "@/components/image/Image";

const Note = ({
  src,
  noteClassName,
  description,
  wrapperClassName,
  buttonClassName,
  iconClassName
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Wrapper className={`${wrapperClassName}`}>
      <Image
        className={`absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer w-[20px] h-[20px] ${buttonClassName}`}
        onClick={(e) => {
          e.stopPropagation()
          setIsHovered(!isHovered)

        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        src={src}
      />
      <Wrapper
        className={`${
          !isHovered && "hidden"
        }  bg-white absolute top-0 -translate-y-full right-0 w-1/2 items-center border py-3 px-2  z-[9999] rounded-lg ${noteClassName}`}
      >
        <Image className={`md:w-[60px] w-[120px] ${iconClassName}`} src={src} />
        <Heading className=" text-primary-400 leading-6 !text-[12px]">
          {description}
        </Heading>
      </Wrapper>
    </Wrapper>
  );
};

export default Note;
