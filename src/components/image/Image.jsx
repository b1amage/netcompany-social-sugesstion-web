const Image = ({
  src,
  alt,
  className,
  imageClassName,
  animate,
  onClick,
  _ref,
  ...restProps
}) => {
  return (
    <div
      ref={_ref}
      onClick={onClick}
      className={`cursor-pointer rounded-lg overflow-hidden ${className}`}
      {...restProps}
    >
      <img
        src={src}
        alt={alt}
        className={`object-cover w-full h-full ${
          animate && "transition-all duration-200 hover:scale-110"
        } ${imageClassName}`}
      />
    </div>
  );
};

export default Image;
