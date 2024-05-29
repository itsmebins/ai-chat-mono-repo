
import { BaseUser } from "@baserepo/utils";

export type SignUpUser = Omit<
  BaseUser,
  "familyName" | "postcode" | "countryCode"
> & {
  brandAssociation?: string;
  accountId?: string;
  sn: string;
};

export type JWTTokenDataType = {
  id: string;
  email: string;
  userName: string;
};
export type JWTResetPasswordTokenType = {
  email: string;
  id: string;
  type: "PASSWORD";
};

export type JWTTokenCreationResponse = {
  expiryDate: string;
};

export type RegistrationDataValidate = Omit<
  BaseUser,
  | "userName"
  | "password"
  | "preferences"
  | "familyName"
  | "postcode"
  | "countryCode"
> & {
  brandAssociation: string;
  accountId: string;
  sn: string;
  "preferences/marketing"?: boolean;
  "preferences/updates"?: boolean;
};
