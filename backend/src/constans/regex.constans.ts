export const regexConstant = {
  NAME: /^[a-zA-Zа-яіїєґА-ЯІЇЄҐ]{2,20}$/,
  SURNAME: /^[a-zA-Zа-яіїєґА-ЯІЇЄҐ]{2,20}$/,
  EMAIL: /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/,
  PASSWORD: /^.{5,}$/,
  PHONE: /^\+?[1-9]\d{1,14}([\s\-\(\)]?\d{1,4}){1,5}$/,
};
