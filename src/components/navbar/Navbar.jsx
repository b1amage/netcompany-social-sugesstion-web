  import { useRef, useState } from "react";
  import { Link } from "react-router-dom";
  import useViewport from "@/hooks/useScreenWidth";
  import NavButton from "./NavButton";
  import { navlinks } from "@/constants/navlinks";
  import Image from "@/components/image/Image";
  import logo from "@/assets/netcompany_logo.svg";
  import { darkIcons, lightIcons } from "@/constants/navIcons";
  import darkMenu from "@/assets/dark-menu.svg";
  import close from "@/assets/close.svg";
  import { createPortal } from "react-dom";
  import useOnClickOutside from "@/hooks/useOnClickOutside";

  const BREAK_POINT_NAVBAR = 768;

  const Navbar = () => {
    const [show, setShow] = useState(false);
    const viewport = useViewport();

    const navbarRef = useRef();
    useOnClickOutside(navbarRef, () => setShow(false));

    return createPortal(
      <nav className=" w-full bg-white border-b border-gray-200">
        <div className="">
          {/* Logo */}
          {viewport.width > BREAK_POINT_NAVBAR && (
            <Link to="/" className="">
              {/* <Logo className="!w-14 !h-14" /> */}
              <Image
                className="flex justify-center w-full py-4 rounded-none bg-primary-400"
                imageClassName="!w-fit"
                src={logo}
                alt="logo"
              />
            </Link>
          )}

          {/* CTA Button */}
          <div className="flex items-center">
            {viewport.width <= BREAK_POINT_NAVBAR && (
              <Image
                imageClassName=""
                src={darkMenu}
                alt="menu"
                className="w-[28px] h-[28px] ml-5 my-6 bg-white sticky"
                onClick={() => setShow(!show)}
              />
            )}
          </div>

          {/* Navigation */}

          {viewport.width > BREAK_POINT_NAVBAR ? (
            <div className="flex justify-center p-4 mt-0 text-sm font-medium bg-transparent border-0 rounded-lg">
              {navlinks.length > 0 &&
                navlinks.map((link, index) => (
                  <NavButton
                    to={link.path}
                    key={index}
                    label={link.label}
                    src={darkIcons[index]}
                    className=""
                  />
                ))}
            </div>
          ) : (
            <div className="">
              {show && (
                <div className="fixed inset-0 duration-300 md:hidden bg-black/50 backdrop-blur-md"></div>
              )}
              <ul
                ref={navbarRef}
                className={`flex flex-col ${
                  show ? "translate-x-0" : "-translate-x-full"
                } duration-300 fixed top-0 h-full pb-6 text-white bg-primary-400 md:mt-0 md:text-sm md:font-medium md:bg-white`}
              >
                <Image
                  className="w-[28px] h-[28px] ml-5 my-6 md:hidden "
                  src={close}
                  alt="close"
                  onClick={() => setShow(!show)}
                />
                {navlinks.length > 0 &&
                  navlinks.map((link, index) => (
                    <NavButton
                      to={link.path}
                      key={index}
                      label={link.label}
                      src={lightIcons[index]}
                      isActive={window.location.pathname === link.path}
                      onClick={() => setShow(!show)}
                    />
                  ))}
              </ul>
            </div>
          )}
        </div>
      </nav>,
      document.querySelector(".navbar-container")
    );
  };

  export default Navbar;
