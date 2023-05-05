import axiosClient from "@/api/axiosClient";

const authApi = {
  async signInWithMicrosoft(msalInstance, navigate) {
    try {
      const loginResponse = await msalInstance.loginPopup({
        scopes: ["user.read"],
      });

      const account = msalInstance.getAccountByUsername(
        loginResponse.account.username
      );
      msalInstance.setActiveAccount(account); // Set Active for Fetching data

      // call POST API send token backend
      const tokenResponse = await msalInstance.acquireTokenSilent({
        scopes: ["user.read"],
      });

      console.log(tokenResponse);

      localStorage.setItem("idToken", tokenResponse.idToken);
      localStorage.setItem("registerEmail", tokenResponse.account.username);
      localStorage.setItem("username", tokenResponse.account.name);

      const backendResponse = await axiosClient.post(
        "/auth/signin",
        {
          microsoftIdToken: tokenResponse.idToken,
        },
        {
          withCredentials: true,
        }
      );

      console.log(
        "Login successfully. Data retrieved from backend: ",
        backendResponse
      );
    } catch (error) {
      const statusCode = error.response.status;
      const unverifiedStatusCode = 406;
      if (statusCode === unverifiedStatusCode) {
        navigate("/verify");
      }
    }
  },

  async signOutWithMicrosoft(msalInstance) {
    try {
      await msalInstance.logoutPopup();
      console.log("Logout successfully");
    } catch (error) {
      console.log(error);
    }
  },

  async verifyAccount(data, setMessage, setError) {
    try {
      const url = "/auth/verify";
      const response = await axiosClient.post(url, data, {
        withCredentials: true,
      });
      setMessage("You are all set!");

      console.log(response);
    } catch (error) {
      console.log(error);
      // setMessage(error.response.data.message[0]);
      setError(true);

      setMessage(
        typeof error.response.data.message === "string"
          ? error.response.data.message
          : error.response.data.message[0]
      );
    }
  },
};

export default authApi;
