import React from "react";
import Image from "@/components/image/Image";
import Wrapper from "@/components/wrapper/Wrapper";
import Text from "@/components/typography/Text";

const Guess = ({ img, name }) => {
  return (
    <Wrapper
      col="true"
      className="items-center w-20 p-1 md:py-4 md:w-24 lg:w-32 bg-neutral-200 rounded-xl snap-start !flex-shrink-0"
    >
      <Image
        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"
        className="w-14 h-14 md:w-18 md:h-18 lg:w-20 lg:h-20 !rounded-full group"
      />
      <Text className="text-overflow-ellipsis">Em Gai Vuon Que</Text>
    </Wrapper>
  );
};

export default Guess;
