import React from "react";

const Screen = ({ className, children }) => {
  return (
    <section className={`min-h-screen container mx-auto relative ${className}`}>
      {children}
    </section>
  );
};

export default Screen;
