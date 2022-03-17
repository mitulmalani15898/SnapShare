import Cookies from "js-cookie";

export const isLoggedIn = () => {
  return (
    !!Cookies.get("accessToken") &&
    !!Cookies.get("idToken") &&
    !!Cookies.get("refreshToken")
  );
};
