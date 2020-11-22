const prod = {
  url: {
    API_URL: process.env.REACT_APP_API_URL,
  },
};

const dev = {
  url: {
    API_URL: "http://localhost:8080",
  },
};
export const globals = process.env.NODE_ENV === "production" ? prod : dev;
