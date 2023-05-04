const SubHeading = (props) => {
  const { children, className } = props;

  return (
    <h3
      {...props}
      className={`text-base lg:text-lg xl:text-xl text-neutral-600 ${className}`}
    >
      {children}
    </h3>
  );
};

export default SubHeading;
