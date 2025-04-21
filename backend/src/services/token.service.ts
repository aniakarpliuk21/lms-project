import * as jwt from "jsonwebtoken";

import { configure } from "../configs/configure";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { TokenEnum } from "../enums/token.enum";
import { ApiError } from "../errors/api-error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";

class TokenService {
  public generateTokens(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, configure.jwtAccessSecret, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(payload, configure.jwtRefreshSecret, {
      expiresIn: "7d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  public generateActionTokens(
    payload: ITokenPayload,
    type: ActionTokenTypeEnum,
  ): string {
    let secret: string;

    switch (type) {
      case ActionTokenTypeEnum.FORGOT_PASSWORD:
        secret = configure.actionForgotPasswordSecret;
        break;
      case ActionTokenTypeEnum.EMAIL_VERIFICATION:
        secret = configure.actionEmailVerificationSecret;
        break;
      default:
        throw new ApiError("Invalid action token type", 500);
    }
    return jwt.sign(payload, secret, { expiresIn: 3600 });
  }

  public verifyToken(
    token: string,
    type: TokenEnum | ActionTokenTypeEnum,
  ): ITokenPayload {
    try {
      let secret: string;
      switch (type) {
        case TokenEnum.ACCESS:
          secret = configure.jwtAccessSecret;
          break;
        case TokenEnum.REFRESH:
          secret = configure.jwtRefreshSecret;
          break;
        case ActionTokenTypeEnum.FORGOT_PASSWORD:
          secret = configure.actionForgotPasswordSecret;
          break;
        case ActionTokenTypeEnum.EMAIL_VERIFICATION:
          secret = configure.actionEmailVerificationSecret;
          break;
        default:
          throw new ApiError("Invalid token type", 401);
      }
      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      console.error(e);
      throw new ApiError("Invalid token", 401);
    }
  }
}

export const tokenService = new TokenService();
