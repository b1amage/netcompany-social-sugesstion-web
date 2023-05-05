import Screen from "@/components/container/Screen";
import notfound from "@/assets/404/404.svg";
import Image from "@/components/image/Image";
import Heading from "@/components/typography/Heading";
import Button from "@/components/button/Button";
import { Link } from "react-router-dom";
import Wrapper from "@/components/wrapper/Wrapper";

const NotFoundScreen = () => {
  return (
    <Screen className="flex-col h-screen gap-5 flex-center">
      <Image
        className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] animate-moveInBottom"
        src={notfound}
        alt="404 illustration"
      />

      <Wrapper col="true" className="!gap-0 animate-moveInBottomDelay">
        <Heading>404 Page Not Found</Heading>
        <Link to="/" className="w-full mx-auto">
          <Button className="mx-auto !text-neutral-700 capitalize" primary>
            Back to home
          </Button>
        </Link>
      </Wrapper>
    </Screen>
  );
};

export default NotFoundScreen;
