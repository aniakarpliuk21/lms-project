import { ApiError } from "../errors/api-error";
import {
  IManager,
  IManagerListQuery,
  IManagerListResponse,
} from "../interfaces/manager.interface";
import { ITokenPayload } from "../interfaces/token.interface";
import { managerPresenter } from "../presenters/manager.presenter";
import { managerRepository } from "../repositories/manager.repository";
import { tokenRepository } from "../repositories/token.repository";

export class ManagerService {
  public async getMe(tokenPayload: ITokenPayload): Promise<IManager> {
    const manager = await managerRepository.getManagerById(
      tokenPayload.managerId,
    );
    if (!manager) {
      throw new ApiError("Manager not found", 404);
    }
    return manager;
  }
  public async getManagerById(managerId: string): Promise<IManager> {
    return await managerRepository.getManagerById(managerId);
  }
  public async getManagerList(
    query: IManagerListQuery,
  ): Promise<IManagerListResponse> {
    const { entities, total } = await managerRepository.getManagerList(query);
    return managerPresenter.toResponseList(entities, total, query);
  }
  public async getManagerListFull(): Promise<IManager[]> {
    return await managerRepository.getManagerListFull();
  }
  public async banManager(managerId: string): Promise<void> {
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
