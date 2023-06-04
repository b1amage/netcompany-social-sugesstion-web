// TODO: Move confidential data to env
const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_APP_MICROSOFT_CLIENT_ID,

    authority: import.meta.env.VITE_APP_MICROSOFT_AUTHORITY,
    redirectUri:
      process.env.NODE_ENV === "dev"
        ? import.meta.env.VITE_APP_REDIRECT_URI_LOCAL
        : import.meta.env.VITE_APP_REDIRECT_URI_PRODUCTION,
  },
  cache: {
    cacheLocation: "sessionStorage",
  },
};

export default msalConfig;
