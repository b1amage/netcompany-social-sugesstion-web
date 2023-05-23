// TODO: Move confidential data to env
const msalConfig = {
  auth: {
    clientId: "252884b0-5f47-4621-9f86-a5b42115a0f0",

    authority: "https://login.microsoftonline.com/common",
    redirectUri:
      process.env.NODE_ENV === "dev"
        ? "http://localhost:5173/login"
        : "https://net-social.netlify.app/login",
  },
  cache: {
    cacheLocation: "sessionStorage",
  },
};

export default msalConfig;
