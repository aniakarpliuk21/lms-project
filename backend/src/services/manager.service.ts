import { ApiError } from "../errors/api-error";
import {
  IManagerListQuery,
  IManagerListResponse,
  IManagerToResponse,
} from "../interfaces/manager.interface";
import { ITokenPayload } from "../interfaces/token.interface";
import { managerPresenter } from "../presenters/manager.presenter";
import { managerRepository } from "../repositories/manager.repository";
import { tokenRepository } from "../repositories/token.repository";

export class ManagerService {
  public async getMe(tokenPayload: ITokenPayload): Promise<IManagerToResponse> {
    const manager = await managerRepository.getManagerById(
      tokenPayload.managerId,
    );
    if (!manager) {
      throw new ApiError("Manager not found", 404);
    }
    return managerPresenter.toResponse(manager);
  }
  public async getManagerById(managerId: string): Promise<IManagerToResponse> {
    const manager = await managerRepository.getManagerById(managerId);
    return managerPresenter.toResponse(manager);
  }
  public async getManagerList(
    query: IManagerListQuery,
  ): Promise<IManagerListResponse> {
    const { entities, total } = await managerRepository.getManagerList(query);
    return managerPresenter.toResponseList(entities, total, query);
  }
  public async getManagerListFull(): Promise<IManagerToResponse[]> {
    const managers = await managerRepository.getManagerListFull();
    return managerPresenter.toResponseListFull(managers);
  }
  public async banManager(
    tokenPayload: ITokenPayload,
    managerId: string,
  ): Promise<void> {
    const currentManager = await managerRepository.getManagerById(
      tokenPayload.managerId,
    );
    if (!currentManager) {
      throw new Error("Manager not found.");
    }
    const currentManagerId = currentManager._id.toString();
    if (managerId === currentManagerId) {
      throw new Error("You cannot ban yourself.");
    }
    await managerRepository.updateManager(managerId, {
      isBanned: true,
    });
    await tokenRepository.deleteAllByParams({ _managerId: managerId });
  }
  public async unbanManager(managerId: string): Promise<void> {
    await managerRepository.updateManager(managerId, {
      isBanned: false,
    });
    await tokenRepository.deleteAllByParams({ _managerId: managerId });
  }
}
export const managerService = new ManagerService();
