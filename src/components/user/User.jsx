import React, { useState } from "react";
import Portal from "@/components/HOC/Portal";
import Image from "@/components/image/Image";
import { useRef } from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";

const User = ({ isCol, user, src }) => {
  const { name, email } = user;

  const [isShowImage, setIsShowImage] = useState(false);
  const handleShowImage = () => setIsShowImage(true);
  const handleCloseImage = () => setIsShowImage(false);

  const avatarRef = useRef();
  useOnClickOutside(avatarRef, handleCloseImage);

  return (
    <div
      className={`${
        isCol && "flex-col text-center"
      } w-fit flex items-center cursor-pointer`}
    >
      <Image
        src={src}
        alt="avatar"
        className="w-[60px] h-[60px] !rounded-full"
        onClick={handleShowImage}
      />
      <div className="flex flex-col px-4">
        <h1 className="text-lg font-bold">{name}</h1>
        <p className="text-md">{email}</p>
      </div>

      {isShowImage && (
        <Portal location="body">
          <div className="absolute z-[9999] inset-0 bg-black bg-opacity-80 flex-center cursor-pointer">
            <Image
              _ref={avatarRef}
              src={src}
              alt="avatar"
              className="cursor-auto animate-zoom h-screen flex items-center"
              imageClassName='rounded-full 2xl:w-[40vw] 2xl:h-[40vw] w-[60vw] h-[60vw]'
            />
          </div>
        </Portal>
      )}
    </div>
  );
};

export default User;
