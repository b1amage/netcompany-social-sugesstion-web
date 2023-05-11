import React from "react";

const Category = ({ children, onClick, isActive }) => {
  return (
    <div
      onClick={() => onClick(children)}
      className={`"inline-block px-5 py-2 text-black capitalize transition-all text-sm md:text-base xl:text-lg shadow-sm cursor-pointer bg-neutral-200 rounded-xl hover:-translate-y-2 hover:shadow-md ${
        isActive ? "!text-white bg-primary-400" : "bg-neutral-200 text-black"
      }`}
    >
      {children.toLowerCase()}
    </div>
  );
};

export default Category;
