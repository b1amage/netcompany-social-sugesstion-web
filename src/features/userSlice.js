import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import msalConfig from "@/config/msalConfig";
import authApi from "@/api/authApi";
import { PublicClientApplication } from "@azure/msal-browser";

const msalInstance = new PublicClientApplication(msalConfig);

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {},
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      const handleLogin = async () => {
        const response = await authApi.signInWithMicrosoft(
          msalInstance,
          payload
        );
        const userLogin = response?.data?.user;
        if (userLogin) {
          localStorage.setItem("user", JSON.stringify(userLogin));
          state.user = JSON.parse(localStorage.getItem("user"));
          // location.reload();
        }
      };
      handleLogin();
    },

    logout: (state) => {
      const handleLogout = async () => {
        await authApi.signOutWithMicrosoft(msalInstance);
        localStorage.setItem("user", JSON.stringify({}));
        state.user = JSON.parse(localStorage.getItem("user"));
        // location.reload();
      };
      handleLogout();
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
