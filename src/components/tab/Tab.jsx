import Wrapper from "@/components/wrapper/Wrapper";
import React from "react";

const Tab = (props) => {
  const { children } = props;
  return (
    <Wrapper
      className="grid grid-cols-2 py-4 place-items-center gap-y-5"
      {...props}
    >
      {children}
    </Wrapper>
  );
};

export default Tab;
