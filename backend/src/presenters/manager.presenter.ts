import {
  IManager,
  IManagerListQuery,
  IManagerListResponse,
  IManagerToResponse,
} from "../interfaces/manager.interface";

class ManagerPresenter {
  public toResponse(entity: IManager): IManagerToResponse {
    return {
      _id: entity._id,
      id: entity.id,
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
  public toResponseListFull(entities: IManager[]): IManagerToResponse[] {
    return entities.map((manager) => this.toResponse(manager));
  }
}

export const managerPresenter = new ManagerPresenter();
