import React from "react";

const Dot = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-white ${className}`}
    ></button>
  );
};

export default Dot;
