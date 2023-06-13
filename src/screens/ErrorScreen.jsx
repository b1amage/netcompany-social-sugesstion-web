import Screen from "@/components/container/Screen";
import error from "@/assets/profile/error.svg";
import Image from "@/components/image/Image";
import Heading from "@/components/typography/Heading";
import Button from "@/components/button/Button";
import { Link, useParams } from "react-router-dom";
import Wrapper from "@/components/wrapper/Wrapper";

const ErrorScreen = () => {
  const { message } = useParams();
  return (
    <Screen className="flex-col flex-1 flex-center h-[80vh] min-h-0 gap-5 flex-center">
      <Image
        className="w-[200px] h-[200px] md:w-[250px] md:h-[250px] animate-moveInBottom"
        src={error}
        alt="404 illustration"
      />

      <Wrapper col="true" className="!gap-0 animate-moveInBottomDelay">
        <Heading className="!text-center">{message}</Heading>
        <Link to="/" className="w-full mx-auto">
          <Button className="mx-auto !text-neutral-700 capitalize" primary>
            Back to home
          </Button>
        </Link>
      </Wrapper>
    </Screen>
  );
};

export default ErrorScreen;
