import Label from "@/components/form/Label";
import { useState } from "react";
import Error from "@/components/form/Error";

const Input = ({
  labelClassName,
  placeholder,
  label,
  required,
  icon,
  type,
  onIconClick,
  value,
  onChange,
  err,
  fluid,
  className,
  name,
  id,
  disabled,
  min,
  errClassName,
  onWheel,
  wrapperInputClassName,
  _ref,
  onEnter
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`flex flex-col ${wrapperInputClassName} ${
        label && "gap-1 md:gap-2 lg:gap-3"
      }`}
    >
      <Label id={id} required={required} className={labelClassName}>
        {label}
      </Label>

      <div className="relative">
        <input
          ref={_ref}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          autoComplete="off"
          className={`w-full border border-primary-400 focus:ring-1 focus:ring-primary-400 px-4 py-3 text-sm transition-all duration-300 outline-none rounded-2xl md:text-base md:px-6 md:py-4 focus:border-primary-100 placeholder:text-secondary-100 ${
            fluid ? "w-full" : "w-1/2"
          } ${
            disabled && "text-black font-bold bg-neutral-100 border-none"
          } ${className} ${
            focused ? "" : "!overflow-hidden !text-overflow-ellipsis"
          }`}
          type={type}
          placeholder={placeholder}
          id={id}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          min={min}
          onWheel={onWheel}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onEnter && onEnter();
            }
          }}
        />

        {icon && (
          <button
            type="button"
            onClick={onIconClick}
            className="absolute -translate-y-1/2 top-1/2 right-5"
          >
            <img
              src={icon}
              alt="icon input"
              className="object-cover w-full h-full"
            />
          </button>
        )}

        {err && err !== "" && (
          <Error fluid className={errClassName}>
            {err}
          </Error>
        )}
      </div>
    </div>
  );
};

Input.defaultProps = {
  type: "text",
};

export default Input;
