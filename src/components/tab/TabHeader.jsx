const TabHeader = (props) => {
  const { children, active } = props;
  return (
    <button
      {...props}
      className={`px-4 py-3 text-2xl md:text-3xl w-1/3 flex-center border-b-2 ${
        active
          ? "text-primary-400 font-bold border-b-primary-400"
          : "text-neutral-500 font-normal border-b-transparent"
      }`}
    >
      {children}
    </button>
  );
};

export default TabHeader;
