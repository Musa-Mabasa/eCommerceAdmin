import { UserCredential } from "@angular/fire/auth";

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

export function clearUserCookies(cookieName: string) {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function setUserProfile(result: UserCredential) {
  if (
    !result?.user?.uid &&
    !result.user.displayName &&
    !result.user.photoURL &&
    !result.user.email
  ) {
    throw new Error("No result came back");
  }
  if (result.user.uid) setCookie("userId", result.user.uid);

  if (result.user.displayName)
    setCookie("displayName", result.user.displayName);

  if (result.user.photoURL) setCookie("avatar", result.user.photoURL);

  if (result.user.email) setCookie("email", result.user.email);
}

export function convertFromCurrency(
  baseValue?: number,
  conversionRate?: number
) {
  if (baseValue && conversionRate) return Number(baseValue * conversionRate);
  else return baseValue;
}

export function convertToCurrency(
  baseValue: number,
  conversionRate: number | undefined
) {
  if (baseValue && conversionRate)
    return Number((baseValue / conversionRate).toFixed(2));
  else return baseValue;
}
