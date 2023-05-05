import Screen from "@/components/container/Screen";
import Button from "@/components/button/Button";
import microsoftIcon from "@/assets/microsoft.svg";
// import { PublicClientApplication } from "@azure/msal-browser";
// import msalConfig from "@/config/msalConfig";
// import authApi from "@/api/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "@/features/userSlice";

// const msalInstance = new PublicClientApplication(msalConfig);

const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Screen className="flex-col flex-center">
      <Button
        className="bg-white border shadow-lg !text-neutral-800 border-neutral-600 animate-moveInBottom"
        icon={microsoftIcon}
        onClick={() => dispatch(login(navigate))}
      >
        Sign in with Microsoft
      </Button>

      <Button onClick={() => dispatch(logout())}>Logout</Button>
    </Screen>
  );
};

export default LoginScreen;
