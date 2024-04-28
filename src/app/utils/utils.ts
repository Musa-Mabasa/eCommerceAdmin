export function setCookie(cookieName: string, cookieValue: string) {
  const d = new Date();
  d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString}`;
  document.cookie = `${cookieName}=${cookieValue}; ${expires}; path=/`;
}

export function getCookie(cookieName: string) {
  const cname = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(";");
  for (let cookie of cookies) {
    while (cookie.charAt(0) == " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cname) == 0) {
      return cookie.substring(cname.length, cookie.length);
    }
  }
  return "";
}
