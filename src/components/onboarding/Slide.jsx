import Screen from "@/components/container/Screen";
import Image from "@/components/image/Image";
import Wrapper from "@/components/wrapper/Wrapper";
import Heading from "@/components/typography/Heading";
import Text from "@/components/typography/Text";

const Slide = ({ className, slide }) => {
  const { img, heading, description, bg } = slide;
  return (
    <Screen
      className={`keen-slider__slide p-5 flex-center flex-col lg:p-20 ${
        bg === "navy"
          ? "bg-primary-400"
          : bg === "slate"
          ? "bg-slate-400"
          : "bg-neutral-300"
      } ${className}`}
    >
      <Image src={img} alt={description} className="my-8" />

      <Wrapper col="true" className="mt-10">
        <Heading
          className={`!text-2xl ${
            bg === "gray" ? "text-primary-400" : "text-white"
          }`}
        >
          {heading}
        </Heading>
        <Text
          className={`${bg === "gray" ? "text-primary-400" : "text-white"}`}
        >
          {description}
        </Text>
      </Wrapper>
    </Screen>
  );
};

export default Slide;
