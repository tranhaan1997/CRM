export const API = "https://ams.vienthongact.vn:50002/Api/"; // "http://localhost:63463";

export const SSO = "https://ams.vienthongact.vn/sso/";

export const WSS = "wss://ams.vienthongact.vn/signal/";

//===============================
// Cookie
//===============================
export const getCookieValue = (name) => {
  const value = document.cookie.match(
    "(^|[^;]+)\\s*" + name + "\\s*=\\s*([^;]+)"
  );
  return value ? value.pop() : null;
};

export const createCookie = (name, value, cookieExpireTime) => {
  const date = new Date();
  date.setTime(date.getTime() + cookieExpireTime);
  const expires = "; expires=" + date.toUTCString();
  console.log("🚀 ~ createCookie ~ expires:", expires);
  document.cookie = name + "=" + value + expires + "; path=/";
};
