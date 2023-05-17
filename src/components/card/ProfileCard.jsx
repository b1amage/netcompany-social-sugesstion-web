import Image from "@/components/image/Image";
import Wrapper from "@/components/wrapper/Wrapper";
import Heading from "@/components/typography/Heading";
import { useMemo } from "react";
import SubHeading from "@/components/typography/SubHeading";

const ProfileCard = ({ place }) => {
  const { images, title, address } = place;
  const cardSizeStyles = useMemo(
    () =>
      "w-[160px] h-[230px] md:w-full md:h-[180px] xl:max-w-[400px] xl:h-[200px]",
    []
  );
  return (
    <div
      className={`${cardSizeStyles} relative flex-col gap-3 transition-all cursor-pointer bg-neutral-300 flex-center xl:flex-row rounded-xl group`}
    >
      <Image src={images[0]} alt={title} className="w-full h-full" animate />

      <Wrapper
        col="true"
        className="absolute group-hover:opacity-25 animate-moveInBottom left-0 bottom-8 h-[60px] md:h-[74px] xl:h-[88px] bg-white w-[90%] md:w-4/5 xl:w-3/4 rounded-r-xl !gap-0 px-2 py-3"
      >
        <Heading className="text-sm text-overflow-ellipsis">{title}</Heading>
        <SubHeading className="text-xs text-overflow-ellipsis">
          {address}
        </SubHeading>
      </Wrapper>
    </div>
  );
};

export default ProfileCard;