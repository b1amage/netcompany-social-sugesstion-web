import React from "react";

const Category = ({ children, onClick, isActive, disableHover, className }) => {
  return (
    <div
      onClick={() => onClick(children)}
      className={`"inline-block px-5 py-2 text-black capitalize transition-all text-sm md:text-base xl:text-lg shadow-sm bg-neutral-200 rounded-xl ${
        isActive ? "!text-white bg-primary-400" : "bg-neutral-200 text-black"
      } ${disableHover ? "" : "hover:opacity-50 cursor-pointer"} ${className}`}
    >
      {children.toLowerCase()}
    </div>
  );
};

export default Category;
