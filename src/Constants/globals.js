const prod = {
  url: {
    API_URL:
      "https://cors-anywhere.herokuapp.com/https://loan-pred-back.herokuapp.com",
  },
};

const dev = {
  url: {
    API_URL: "http://localhost:8080",
  },
};
export const globals = process.env.NODE_ENV === "production" ? prod : dev;
