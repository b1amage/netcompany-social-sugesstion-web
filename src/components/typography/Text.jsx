const Text = (props) => {
  const { children, className } = props;
  return (
    <p
      className={`text-sm lg:text-base xl:text-lg text-neutral-600 ${className}`}
      {...props}
    >
      {children}
    </p>
  );
};

export default Text;
