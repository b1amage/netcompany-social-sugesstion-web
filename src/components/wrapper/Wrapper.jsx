const Wrapper = (props) => {
  const { className, children, col, _ref } = props;
  return (
    <div
      {...props}
      ref={_ref}
      className={`flex ${col && "flex-col"} gap-2 ${className}`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
