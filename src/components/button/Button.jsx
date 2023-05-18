import classNames from "classnames";
import React from "react";

const Button = ({
  icon,
  children,
  primary,
  secondary,
  active,
  warning,
  danger,
  rounded,
  small,
  ...rest
}) => {
  const classes = classNames(
    rest.className,
    "font-bold text-white bg-neutral-400 rounded-lg border-x border-neutral-400 py-3 px-4 my-4 relative flex justify-center items-center box-border transition-all hover:opacity-80 duration-200",
    {
      "w-full": primary,
      "w-1/2": secondary,
      "bg-red-400": danger,
      "bg-primary-400": active,
      "w-1/4 !py-1": small,
      "!text-primary-200": warning,
      "!rounded-full": rounded,
    }
  );
  return (
    <button {...rest} className={classes}>
      {icon && <img src={icon} alt="icon-btn" />}
      {children}
    </button>
  );
};

export default Button;
