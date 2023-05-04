import Screen from "@/components/container/Screen";
import Button from "@/components/button/Button";
import microsoftIcon from "@/assets/microsoft.svg";

const LoginScreen = () => {
  return (
    <Screen className="flex-col flex-center">
      <Button
        className="bg-white border shadow-lg text-neutral-800 border-neutral-600 animate-moveInBottom"
        icon={microsoftIcon}
      >
        Sign in with Microsoft
      </Button>
    </Screen>
  );
};

export default LoginScreen;
