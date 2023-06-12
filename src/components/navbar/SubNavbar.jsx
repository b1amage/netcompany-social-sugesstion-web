import React, { useEffect } from "react";
import add from "@/assets/add.svg";
import notification from "@/assets/bell.svg";
import filter from "@/assets/filter.svg";
import Counter from "@/components/counter/Counter";
import Image from "@/components/image/Image";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "@/components/wrapper/Wrapper";
import { validatePathname } from "@/features/navbarSlice";
const SubNavbar = () => {
  const dispatch = useDispatch();
  const { isAdded, isShowNotification, isShowFilter } = useSelector(
    ({ navbar }) => {
      return {
        isAdded: navbar.isAdded,
        isShowNotification: navbar.isShowNotification,
        isShowFilter: navbar.isShowFilter,
      };
    }
  );

  useEffect(() => {
    dispatch(validatePathname(window.location.pathname));
  }, [window.location.pathname]);
  return (
    <Wrapper className="">
      {isAdded && (
        <Image
          imageClassName=""
          src={add}
          alt="add"
          className="w-[28px] h-[28px] m-2"
        />
      )}
      {isShowNotification && (
        <div className="relative">
          <Image
            imageClassName=""
            src={notification}
            alt="notification"
            className="w-[28px] h-[28px] m-2"
          />
          <Counter count={10} />
        </div>
      )}
      {isShowFilter && (
        <Image
          imageClassName=""
          src={filter}
          alt="filter"
          className="w-[28px] h-[28px] m-2"
        />
      )}
    </Wrapper>
  );
};

export default SubNavbar;
