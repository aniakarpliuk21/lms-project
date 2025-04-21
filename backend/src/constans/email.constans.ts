import { EmailTypeEnum } from "../enums/email-type.enum";

export const emailConstans = {
  [EmailTypeEnum.WELCOME]: {
    subject: "Welcome subject",
    template: "welcome",
  },
  [EmailTypeEnum.FORGOT_PASSWORD]: {
    subject: "Forgot password subject",
    template: "forgot-password",
  },
  [EmailTypeEnum.LOGOUT]: {
    subject: "Logout subject",
    template: "logout",
  },
};
