import { EmailTypeEnum } from "../enums/email-type.enum";
import { EmailCombinePayloadType } from "./email-combined-payload.type";
import { PickRequired } from "./pick-required.type";

export type EmailTypeToPayloadType = {
  [EmailTypeEnum.WELCOME]: PickRequired<
    EmailCombinePayloadType,
    "name" | "frontUrl" | "actionToken"
  >;
  [EmailTypeEnum.FORGOT_PASSWORD]: PickRequired<
    EmailCombinePayloadType,
    "name" | "frontUrl" | "actionToken"
  >;
  [EmailTypeEnum.LOGOUT]: PickRequired<
    EmailCombinePayloadType,
    "name" | "frontUrl"
  >;
};
