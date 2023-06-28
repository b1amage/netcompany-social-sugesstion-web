import React from "react";
import Image from "@/components/image/Image";
import Wrapper from "@/components/wrapper/Wrapper";
import Text from "@/components/typography/Text";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Guess = ({ img, name, id, email }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  return (
    <Wrapper
      onClick={() => {
        navigate(user._id === id ? `/profile` : `/user/${id}`);
      }}
      col="true"
      className="!cursor-pointer items-center w-[130px] p-4 md:py-4 md:w-[120px] lg:w-[180px] h-[150px] bg-neutral-200 rounded-xl snap-start !flex-shrink-0 transition-all duration-200 ease-in-out hover:w-[250px]"
    >
      <Image
        src={img}
        className="w-14 h-14 md:w-18 md:h-18 !rounded-full group"
      />
      <Text className="w-3/4 mx-auto text-center !text-overflow-ellipsis">
        {name}
      </Text>
      <Text className="w-3/4 mx-auto !text-overflow-ellipsis !text-xs text-center">
        {email}
      </Text>
    </Wrapper>
  );
};

export default Guess;
