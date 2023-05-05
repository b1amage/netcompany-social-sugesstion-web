import React from "react";
import menu from "@/assets/menu.svg";
import darkMenu from "@/assets/dark-menu.svg";
import logo from "@/assets/netcompany_logo.svg";

import add from "@/assets/add.svg";
import notification from "@/assets/bell.svg";
import filter from "@/assets/filter.svg";

import Image from "@/components/image/Image";
import Counter from "@/components/counter/Counter";

const NavHeader = ({ screenWidth, handleMenuClick, isAdded, isShowNotification, isShowFilter }) => {
  return (
    <div className="flex md:justify-around items-center md:bg-primary-400 px-4">
      {screenWidth < 768 ? (
        <>
          <Image
            className="pr-44 py-4 hover:opacity-60 duration-200"
            imageClassName="w-[28px] h-[28px]"
            src={screenWidth > 768 ? menu : darkMenu}
            alt="menu"
            onClick={handleMenuClick}
          />

          <div className="flex gap-4 items-center w-full justify-end">
            {isAdded && <Image src={add} alt="add" className="w-[28px] h-[28px]" />}
            
            {isShowNotification && <div className="relative">
              <Image
                src={notification}
                alt="notification"
                imageClassName="w-[28px] h-[28px]"
                className='p-2'
              />
              <Counter count={10} />
            </div>}

            {isShowFilter && <Image src={filter} alt="filter" imageClassName="w-[28px] h-[28px]" />}
          </div>
        </>
      ) : (
        <Image className="w-fit py-4" src={logo} alt="logo" />
      )}
    </div>
  );
};

export default NavHeader;
