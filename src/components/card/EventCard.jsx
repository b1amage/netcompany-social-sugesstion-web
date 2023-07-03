import Image from "@/components/image/Image";
import SubHeading from "@/components/typography/SubHeading";
import { GoLocation } from "react-icons/go";
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import Text from "@/components/typography/Text";
import Wrapper from "@/components/wrapper/Wrapper";
import Heading from "@/components/typography/Heading";
import { useNavigate } from "react-router-dom";

const EventCard = (props) => {
  function parseDate(isoString) {
    const [datePart, timePart] = isoString.split("T");
    const [yyyy, mm, dd] = datePart.split("-");
    const [hh, mi] = timePart.split(":");

    return [`${dd}/${mm}/${yyyy}`, `${hh}:${mi}`];
  }
  const { event, className } = props;
  const { imageUrls, name, location, startDateTime, _id } = event;
  const [date, time] = parseDate(startDateTime);
  const navigate = useNavigate();
  return (
    <Wrapper
      onClick={() => navigate(`/event/${_id}`)}
      {...props}
      col="true"
      className={`px-3 py-2 rounded-lg shadow-lg md:max-w-[400px] lg:max-w-[420px] cursor-pointer ${className}`}
    >
      {/* TOP */}
      <Wrapper className="gap-5 pb-3 border-b border-b-neutral-400">
        <Image
          animate
          className="!w-[80px] !h-[80px] !min-w-[80px] lg:!w-[90px] lg:!h-[90px]"
          src={imageUrls[0]}
        />

        <Wrapper col="true" className="!gap-0 max-w-1/2">
          <Heading className="text-overflow-ellipsis">{name}</Heading>
          <Wrapper className="items-center gap-2">
            <GoLocation />
            <SubHeading className="text-overflow-ellipsis">
              {location.name}
            </SubHeading>
          </Wrapper>

          {/* <Text className="text-overflow-ellipsis-2-clamp">{description}</Text> */}
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
