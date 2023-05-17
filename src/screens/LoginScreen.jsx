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
    <Screen className="flex flex-col px-4 py-3 xl:py-20 bg-login">
      <Wrapper col="true" className="mt-8 justify-self-start">
        <Heading>Welcome to Netcompany Suggesstion App</Heading>
        <SubHeading>Let's sign in</SubHeading>
      </Wrapper>

      <Image
        className="flex flex-1 w-[240px] h-[240px] lg:w-[400px] lg:h-[500px] mx-auto mt-20"
        src={loginImage}
      />

      <Wrapper>
        <Button
          className="bg-white border shadow-lg !text-neutral-800 border-neutral-600 animate-moveInBottom"
          icon={microsoftIcon}
          onClick={() => dispatch(login(navigate))}
        >
          Sign in with Microsoft
        </Button>

        <Button onClick={() => dispatch(logout())}>Logout</Button>
      </Wrapper>
    </Screen>
  );
};

export default LoginScreen;
