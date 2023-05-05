const Wrapper = (props) => {
  const { className, children, col } = props;
  return (
    <div {...props} className={`flex ${col && "flex-col"} gap-2 ${className}`}>
      {children}
    </div>
  );
};

export default Wrapper;
