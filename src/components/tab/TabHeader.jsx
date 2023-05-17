import React from "react";

const TabHeader = (props) => {
  const { children, isActive } = props;
  return (
    <button
      {...props}
      className={`px-4 py-3 text-2xl  w-[100px] text-center flex-center ${
        isActive
          ? "text-primary-400 font-bold border-b-2 border-b-primary-400"
          : "text-neutral-500 font-normal border-b-0"
      }`}
    >
      {children}
    </button>
  );
};

export default TabHeader;
