import { MdError } from "react-icons/md";

const Error = ({ children, fluid, className }) => {
  return (
    <div
      className={`flex items-center px-4 py-2 my-2 text-red-600 bg-red-600 rounded-2xl bg-opacity-10 ${
        fluid ? "w-full" : "w-1/2"
      } ${className}`}
    >
      <h3 className="flex flex-1">{children}</h3>

      <MdError className="text-lg md:text-xl" />
    </div>
  );
};

export default Error;
