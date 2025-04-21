import {
  IManagerListQuery,
  IManagerListResponse,
} from "../interfaces/manager.interface";
import { managerPresenter } from "../presenters/manager.presenter";
import { managerRepository } from "../repositories/manager.repository";
import { tokenRepository } from "../repositories/token.repository";

export class ManagerService {
  public async getManagerList(
    query: IManagerListQuery,
  ): Promise<IManagerListResponse> {
    const { entities, total } = await managerRepository.getList(query);
    return managerPresenter.toResponseList(entities, total, query);
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
