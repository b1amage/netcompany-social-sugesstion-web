import { BsFillCheckCircleFill } from "react-icons/bs";

const Message = ({ children, fluid, className }) => {
  return (
    <div
      className={`flex items-center px-4 py-2 my-2 text-green-600 bg-green-400 rounded-2xl bg-opacity-10 ${
        fluid ? "w-full" : "w-1/2"
      } ${className}`}
    >
      <h3 className="flex flex-1">{children}</h3>

      <BsFillCheckCircleFill className="text-lg md:text-xl" />
    </div>
  );
};

export default Message;
