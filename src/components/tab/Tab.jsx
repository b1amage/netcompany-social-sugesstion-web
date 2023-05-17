import Wrapper from "@/components/wrapper/Wrapper";
import React from "react";

const Tab = (props) => {
  const { children } = props;
  return (
    <Wrapper
      className="grid grid-cols-2 gap-4 py-4 xl:grid-cols-3 place-items-center gap-y-5 md:gap-8 xl:gap-12"
      {...props}
    >
      {children}
    </Wrapper>
  );
};

export default Tab;
