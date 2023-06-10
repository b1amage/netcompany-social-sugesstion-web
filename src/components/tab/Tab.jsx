import Wrapper from "@/components/wrapper/Wrapper";
import { useRef, useEffect } from "react";

const Tab = (props) => {
  const { children, handleScrollToBottom } = props;
  const tabRef = useRef();

  useEffect(() => {
    const handleScroll = async () => {
      if (!tabRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = tabRef.current;
      const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight;

      if (isScrolledToBottom) {
        console.log("Scrolled to bottom!");
        await handleScrollToBottom();
      }
    };

    tabRef.current.addEventListener("scroll", handleScroll);

    return () => {
      if (tabRef.current) {
        // Remember to remove event listener when the component is unmounted
        tabRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div
      ref={tabRef}
      className="grid grid-cols-2 gap-4 py-4 xl:grid-cols-3 place-items-center gap-y-5 md:gap-8 xl:gap-12 h-[400px] lg:h-[450px] overflow-y-scroll"
      {...props}
    >
      {children}
    </div>
  );
};

export default Tab;
