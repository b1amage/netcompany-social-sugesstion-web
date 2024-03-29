import Screen from "@/components/container/Screen";
import Button from "@/components/button/Button";
import microsoftIcon from "@/assets/microsoft.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "@/features/userSlice";
import Wrapper from "@/components/wrapper/Wrapper";
import Heading from "@/components/typography/Heading";
import SubHeading from "@/components/typography/SubHeading";
import Image from "@/components/image/Image";
import loginImage from "@/assets/login/login.svg";

const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Screen className="flex flex-col flex-center px-4 py-3 xl:py-20 min-h-[90vh] md:min-h-[85vh] lg:!min-h-0 lg:!h-[70vh]">
      <Wrapper
        col="true"
        className="!flex-1 !justify-between lg:bg-neutral-400 lg:p-20 lg:shadow-xl lg:rounded-lg lg:h-[700px] lg:mt-14"
      >
        <Wrapper
          col="true"
          className="self-start mt-8 xl:mt-0 justify-items-start"
        >
          <Heading>Welcome to Netcompany Suggesstion App</Heading>
          <SubHeading>Let's sign in</SubHeading>
        </Wrapper>

        <Image
          className="flex w-[300px] h-[300px] md:w-[380px] md:h-[380px] lg:w-[450px] lg:h-[450px] mx-auto drop-shadow-xl xl:mx-0"
          src={loginImage}
        />

        <Wrapper>
          <Button
            primary
            className="bg-white border shadow-lg !text-neutral-800 border-neutral-600 animate-moveInBottom xl:my-0"
            icon={microsoftIcon}
            onClick={() => dispatch(login(navigate))}
          >
            Sign in with Microsoft
          </Button>

          {/* // !TODO: Remove when done testing */}
          {/* <Button className="xl:my-0" onClick={() => dispatch(logout())}>
            Logout
          </Button> */}
        </Wrapper>
      </Wrapper>
    </Screen>
  );
};

export default LoginScreen;
