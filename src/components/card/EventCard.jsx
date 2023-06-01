import Image from "@/components/image/Image";
import SubHeading from "@/components/typography/SubHeading";
import { GoLocation } from "react-icons/go";
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import Text from "@/components/typography/Text";
import Wrapper from "@/components/wrapper/Wrapper";
import Heading from "@/components/typography/Heading";

const EventCard = (props) => {
  const { event, className } = props;
  const { img, title, address, description, date, time } = event;
  return (
    <Wrapper
      {...props}
      col="true"
      className={`px-3 py-2 rounded-lg shadow-lg md:max-w-[400px] lg:max-w-[420px] cursor-pointer ${className}`}
    >
      {/* TOP */}
      <Wrapper className="gap-5 pb-3 border-b border-b-neutral-400">
        <Image
          animate
          className="!w-[100px] !h-[100px] !min-w-[100px] lg:!w-[108px] lg:!h-[108px]"
          src={img}
        />

        <Wrapper col="true" className="!gap-0 max-w-1/2">
          <Heading className="text-overflow-ellipsis">{title}</Heading>
          <Wrapper className="items-center gap-2">
            <GoLocation />
            <SubHeading className="text-overflow-ellipsis">
              {address}
            </SubHeading>
          </Wrapper>

          <Text className="text-overflow-ellipsis-2-clamp">{description}</Text>
        </Wrapper>
      </Wrapper>

      {/* BOTTOM */}
      <Wrapper className="justify-between py-2">
        <Wrapper className="items-center gap-2">
          <AiOutlineCalendar />
          <Text>{date}</Text>
        </Wrapper>

        <Wrapper className="items-center gap-2">
          <AiOutlineClockCircle />
          <Text>{time}</Text>
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
};

export default EventCard;
