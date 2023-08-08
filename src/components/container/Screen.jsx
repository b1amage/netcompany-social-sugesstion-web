import useAuthentication from "@/hooks/useAuthentication";
import React from "react";

const Screen = ({ className, children, _ref }) => {
  const { isLogin } = useAuthentication();
  return (
    <section
      ref={_ref}
      className={`min-h-screen container mx-auto relative 
  ${
    isLogin
      ? "mt-[80px] mb-[100px] md:mt-[120px] lg:mt-[160px]"
      : "md:mt-[80px] lg:mt-[160px]"
  }
  ${className}`}
    >
      {children}
    </section>
  );
};

export default Screen;
