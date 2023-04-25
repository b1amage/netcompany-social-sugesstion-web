const Loading = ({ className }) => {
  return (
    <div
      className={`w-14 h-14 border-8 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full border-primary-400 border-r-transparent border-l-transparent animate-spin ${className}`}
    ></div>
  );
};

export default Loading;
