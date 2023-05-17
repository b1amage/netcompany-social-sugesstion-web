import Image from "@/components/image/Image";
import Wrapper from "@/components/wrapper/Wrapper";
import Heading from "@/components/typography/Heading";
import { useMemo } from "react";
import SubHeading from "@/components/typography/SubHeading";

const ProfileCard = ({ place }) => {
  const { images, title, address } = place;
  const cardSizeStyles = useMemo(
    () =>
      "w-[160px] h-[230px] md:w-[250px] md:h-[300px] xl:w-[400px] xl:h-[180px]",
    []
  );
  return (
    <div
      className={`${cardSizeStyles} relative flex-col gap-3 transition-all shadow-lg cursor-pointer  md:py-4 xl:pt-6 bg-neutral-300 flex-center xl:flex-row xl:items-start rounded-xl lg:hover:-translate-y-2`}
    >
      <Image src={images[0]} alt={title} className="w-full h-full" animate />

      <Wrapper
        col="true"
        className="absolute left-0 bottom-8 h-[60px] bg-white w-[90%] rounded-r-xl !gap-0 px-2 py-3"
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
