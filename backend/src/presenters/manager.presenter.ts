import {
  IManager,
  IManagerListQuery,
  IManagerListResponse,
} from "../interfaces/manager.interface";

class ManagerPresenter {
  public toResponse(entity: IManager) {
    return {
      _id: entity._id,
      name: entity.name,
      surname: entity.surname,
      email: entity.email,
      password: entity.password,
      role: entity.role,
      status: entity.status,
      phone: entity.phone,
      isDeleted: entity.isDeleted,
      isVerified: entity.isVerified,
      isBanned: entity.isBanned,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      lastVisit: entity.lastVisit,
    };
  }
  public toShortResponse(entity: IManager) {
    return {
      _id: entity._id,
      name: entity.name,
      surname: entity.surname,
      email: entity.email,
      role: entity.role,
      status: entity.status,
      phone: entity.phone,
      isDeleted: entity.isDeleted,
      isVerified: entity.isVerified,
      isBanned: entity.isBanned,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      lastVisit: entity.lastVisit,
    };
  }
  public toResponseList(
    entities: IManager[],
    total: number,
    query: IManagerListQuery,
  ): IManagerListResponse {
    return {
      total,
      data: entities.map(this.toResponse),
      ...query,
    };
  }
}
export const managerPresenter = new ManagerPresenter();
