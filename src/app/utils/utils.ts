function setCookie(cookieName: string, cookieValue: string, exdays: number) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString}`;
  document.cookie = `${cookieName}=${cookieValue}; ${expires}; path=/`;
}
