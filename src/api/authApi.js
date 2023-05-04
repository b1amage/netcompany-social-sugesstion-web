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
};

export default authApi;
