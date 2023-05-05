const Heading = (props) => {
  const { children, className } = props;

  return (
    <h1
      {...props}
      className={`text-lg lg:text-xl xl:text-2xl font-semibold text-primary-800 ${className}`}
    >
      {children}
    </h1>
  );
};

export default Heading;
