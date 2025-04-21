import { configure } from "../configs/configure";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { EmailTypeEnum } from "../enums/email-type.enum";
import { ApiError } from "../errors/api-error";
import { IVerifyToken } from "../interfaces/action-token.interface";
import {
  IAdminCreateDto,
  IChangePassword,
  IForgotPassword,
  IForgotPasswordSet,
  IManager,
  IManagerCreateDto,
  IManagerLoginDto,
} from "../interfaces/manager.interface";
import { IPasswordCreateDto } from "../interfaces/password.interface";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import { actionTokenRepository } from "../repositories/action-token.repository";
import { managerRepository } from "../repositories/manager.repository";
import { oldPasswordRepository } from "../repositories/odl-password.repository";
import { tokenRepository } from "../repositories/token.repository";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async registerManager(dto: IManagerCreateDto): Promise<IManager> {
    await authService.isEmailUnique(dto.email);
    const manager = await managerRepository.createManager(dto);
    const actionToken = tokenService.generateActionTokens(
      { managerId: manager._id, role: manager.role },
      ActionTokenTypeEnum.EMAIL_VERIFICATION,
    );
    await actionTokenRepository.create({
      type: ActionTokenTypeEnum.EMAIL_VERIFICATION,
      _managerId: manager._id,
      token: actionToken,
    });
    await emailService.sendEmail(EmailTypeEnum.WELCOME, dto.email, {
      name: manager.name,
      frontUrl: configure.frontUrl,
      actionToken,
    });
    return manager;
  }
  public async registerAdmin(
    dto: IAdminCreateDto,
  ): Promise<{ manager: IManager; tokens: ITokenPair }> {
    await authService.isEmailUnique(dto.email);
    const password = await passwordService.hashPassword(dto.password);
    const manager = await managerRepository.createAdmin({ ...dto, password });
    const tokens = tokenService.generateTokens({
      managerId: manager._id,
      role: manager.role,
    });
    await tokenRepository.create({ ...tokens, _managerId: manager._id });
    const actionToken = tokenService.generateActionTokens(
      { managerId: manager._id, role: manager.role },
      ActionTokenTypeEnum.EMAIL_VERIFICATION,
    );
    await actionTokenRepository.create({
      type: ActionTokenTypeEnum.EMAIL_VERIFICATION,
      _managerId: manager._id,
      token: actionToken,
    });
    return { manager, tokens };
  }
  public async login(
    dto: IManagerLoginDto,
  ): Promise<{ manager: IManager; tokens: ITokenPair }> {
    const manager = await managerRepository.getByEmail(dto.email);
    if (!manager) {
      throw new ApiError("Manager not found", 404);
    }
    if (manager.isBanned) {
      throw new ApiError("Manager blocked by administrator", 403);
    }
    const isPasswordCorrect = await passwordService.comparePassword(
      dto.password,
      manager.password,
    );
    if (!isPasswordCorrect) {
      throw new ApiError("Incorrect email or password", 401);
    }
    const tokens = tokenService.generateTokens({
      managerId: manager._id,
      role: manager.role,
    });
    await tokenRepository.create({ ...tokens, _managerId: manager._id });
    await managerRepository.updateManager(manager._id, {
      lastVisit: new Date(),
    });
    return { manager, tokens };
  }

  public async refresh(
    tokenPayload: ITokenPayload,
    refreshToken: string,
  ): Promise<ITokenPair> {
    await tokenRepository.deleteByParams({ refreshToken });
    const tokens = tokenService.generateTokens({
      managerId: tokenPayload.managerId,
      role: tokenPayload.role,
    });
    await tokenRepository.create({
      ...tokens,
      _managerId: tokenPayload.managerId,
    });
    return tokens;
  }
  public async logout(
    tokenPayload: ITokenPayload,
    tokenId: string,
  ): Promise<void> {
    const manager = await managerRepository.getManagerById(
      tokenPayload.managerId,
    );
    await tokenRepository.deleteByParams({ _id: tokenId });
    await emailService.sendEmail(EmailTypeEnum.LOGOUT, manager.email, {
      name: manager.name,
      frontUrl: configure.frontUrl,
    });
    await emailService.sendEmail(EmailTypeEnum.LOGOUT, manager.email, {
      name: manager.name,
      frontUrl: configure.frontUrl,
    });
  }
  public async logoutAll(tokenPayload: ITokenPayload): Promise<void> {
    const manager = await managerRepository.getManagerById(
      tokenPayload.managerId,
    );
    await tokenRepository.deleteAllByParams({
      _managerId: tokenPayload.managerId,
    });
    await emailService.sendEmail(EmailTypeEnum.LOGOUT, manager.email, {
      name: manager.name,
      frontUrl: configure.frontUrl,
    });
  }
  public async addPassword(dto: IPasswordCreateDto): Promise<void> {
    const managerId = dto.managerId;
    const hashedPassword = await passwordService.hashPassword(dto.password);
    await managerRepository.updateManager(managerId, {
      password: hashedPassword,
    });
    await tokenRepository.deleteAllByParams({ _managerId: managerId });
  }
  public async forgotPassword(dto: IForgotPassword): Promise<void> {
    const manager = await managerRepository.getByEmail(dto.email);
    if (!manager) {
      return;
    }
    const token = tokenService.generateActionTokens(
      { managerId: manager._id, role: manager.role },
      ActionTokenTypeEnum.FORGOT_PASSWORD,
    );
    await actionTokenRepository.create({
      _managerId: manager._id,
      token,
      type: ActionTokenTypeEnum.FORGOT_PASSWORD,
    });
    await emailService.sendEmail(EmailTypeEnum.FORGOT_PASSWORD, dto.email, {
      name: manager.name,
      frontUrl: configure.frontUrl,
      actionToken: token,
    });
  }
  public async forgotPasswordSet(
    dto: IForgotPasswordSet,
    tokenPayload: ITokenPayload,
  ): Promise<void> {
    const password = await passwordService.hashPassword(dto.password);
    await managerRepository.updateManager(tokenPayload.managerId, {
      password,
    });
    await Promise.all([
      actionTokenRepository.deleteByParams({ token: dto.token }),
      tokenRepository.deleteAllByParams({
        _managerId: tokenPayload.managerId,
      }),
    ]);
  }
  public async verify(
    dto: IVerifyToken,
    tokenPayload: ITokenPayload,
  ): Promise<IManager> {
    const manager = await managerRepository.updateManager(
      tokenPayload.managerId,
      {
        isVerified: true,
      },
    );
    await actionTokenRepository.deleteByParams({ token: dto.token });
    return manager;
  }
  public async changePassword(
    dto: IChangePassword,
    tokenPayload: ITokenPayload,
  ): Promise<void> {
    const manager = await managerRepository.getManagerById(
      tokenPayload.managerId,
    );
    const oldPasswords = await oldPasswordRepository.getListByManagerId(
      tokenPayload.managerId,
    );
    const isPasswordCorrect = await passwordService.comparePassword(
      dto.oldPassword,
      manager.password,
    );
    if (!isPasswordCorrect) {
      throw new ApiError("Incorrect password", 401);
    }
    await Promise.all(
      [...oldPasswords, { password: manager.password }].map(
        async (oldPassword) => {
          const isPrev = await passwordService.comparePassword(
            dto.newPassword,
            oldPassword.password,
          );
          if (isPrev) {
            throw new ApiError(
              "Password can't be the same as the previous one",
              409,
            );
          }
        },
      ),
    );
    const password = await passwordService.hashPassword(dto.newPassword);
    await managerRepository.updateManager(tokenPayload.managerId, {
      password,
    });
    await tokenRepository.deleteAllByParams({
      _managerId: tokenPayload.managerId,
    });
    await oldPasswordRepository.create({
      _managerId: manager._id,
      password: manager.password,
    });
  }
  public async isEmailUnique(email: string): Promise<void> {
    const manager = await managerRepository.getByEmail(email);
    if (manager) {
      throw new ApiError("Email is already in use", 409);
    }
  }
}
export const authService = new AuthService();
