export const getCookie = (name: string) => {
  name += "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export const setCookie = (name: string, value: string, expires: Date) => {
  document.cookie = `${name}=${value}; expires: ${expires.toUTCString()}`;
}

export const removeCookie = (name: string) => {
  document.cookie = `${name}=''; max-age: 0`;
}