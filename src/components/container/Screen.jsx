import useAuthentication from "@/hooks/useAuthentication";
import React from "react";

const Screen = ({ className, children }) => {
  const { isLogin } = useAuthentication();
  return (
    <section
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
