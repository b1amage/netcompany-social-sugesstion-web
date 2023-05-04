import Screen from "@/components/container/Screen";
import Button from "@/components/button/Button";
import microsoftIcon from "@/assets/microsoft.svg";
import { PublicClientApplication } from "@azure/msal-browser";
import msalConfig from "@/config/msalConfig";
import authApi from "@/api/authApi";
import { useNavigate } from "react-router-dom";

const msalInstance = new PublicClientApplication(msalConfig);

const LoginScreen = () => {
  const navigate = useNavigate();

  const handleLoginWithMicrosoftButtonClick = async () => {
    await authApi.signInWithMicrosoft(msalInstance, navigate);
  };

  const handleLogoutWithMicrosoftButtonClick = async () => {
    await authApi.signOutWithMicrosoft(msalInstance);
  };

  return (
    <Screen className="flex-col flex-center">
      <Button
        className="bg-white border shadow-lg !text-neutral-800 border-neutral-600 animate-moveInBottom"
        icon={microsoftIcon}
        onClick={handleLoginWithMicrosoftButtonClick}
      >
        Sign in with Microsoft
      </Button>

      <Button onClick={handleLogoutWithMicrosoftButtonClick}>Logout</Button>
    </Screen>
  );
};

export default LoginScreen;
