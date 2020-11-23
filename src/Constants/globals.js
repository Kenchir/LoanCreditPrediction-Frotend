const prod = {
  url: {
    API_URL: process.env.REACT_APP_PROD_API_URL,
  },
};

const dev = {
  url: {
    API_URL: process.env.REACT_APP_DEV_API_URL,
  },
};
export const globals = process.env.NODE_ENV === "production" ? prod : dev;
