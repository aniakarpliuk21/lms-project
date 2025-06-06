import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

export const configure = {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,

  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,

  smtpPassword: process.env.SMTP_PASSWORD,
  smtpEmail: process.env.SMTP_EMAIL,

  actionForgotPasswordSecret: process.env.ACTION_FORGOT_PASSWORD_SECRET,
  actionForgotPasswordExpiresIn: process.env.ACTION_FORGOT_PASSWORD_EXPIRES_IN,
  actionEmailVerificationSecret: process.env.ACTION_EMAIL_VERIFICATION_SECRET,
  actionEmailVerificationExpiresIn:
    process.env.ACTION_EMAIL_VERIFICATION_EXPIRES_IN,
  frontUrl: process.env.FRONT_URL || "http://localhost",
};
