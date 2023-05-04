const Label = ({ id, required, className, children }) => {
  return (
    <label
      htmlFor={id}
      className={`px-4 font-semibold capitalize md:text-xl ${className}`}
    >
      <span>{children}</span>

      {required && <span className="text-red-500">*</span>}
    </label>
  );
};

export default Label;
