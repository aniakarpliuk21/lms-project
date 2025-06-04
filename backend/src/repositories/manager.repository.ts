import { FilterQuery, SortOrder } from "mongoose";

import { ManagerListOrderEnum } from "../enums/manager-list-order.enum";
import { ApiError } from "../errors/api-error";
import {
  IAdminCreateDto,
  IManager,
  IManagerCreateDto,
  IManagerListQuery,
} from "../interfaces/manager.interface";
import { Manager } from "../model/manager.model";

class ManagerRepository {
  public async getManagerList(
    query: IManagerListQuery,
  ): Promise<{ entities: IManager[]; total: number }> {
    const filterObj: FilterQuery<IManager> = { isDeleted: false };
    if (query.search) {
      filterObj.name = { $regex: query.search, $options: "i" };
    }
    const skip = query.limit * (query.page - 1);
    const sortObj: { [key: string]: SortOrder } = {};
    switch (query.orderBy) {
      case ManagerListOrderEnum.CREATED_AT:
        sortObj.createdAt = query.order;
        break;
      default:
        throw new ApiError("Invalid order by", 400);
    }
    const [entities, total] = await Promise.all([
      Manager.find(filterObj).sort(sortObj).limit(query.limit).skip(skip),
      Manager.countDocuments(filterObj),
    ]);
    return { entities, total };
  }
  public async getManagerListFull(): Promise<IManager[]> {
    return await Manager.find();
  }

  public async createAdmin(dto: IAdminCreateDto): Promise<IManager> {
    return await Manager.create(dto);
  }
  public async createManager(dto: IManagerCreateDto): Promise<IManager> {
    return await Manager.create(dto);
  }

  public async delete(userId: string): Promise<void> {
    await Manager.deleteOne({ id: userId });
  }
  public async deleteOneByEmail(email: string): Promise<void> {
    await Manager.deleteOne({ email });
  }

  public async getManagerById(managerId: string): Promise<IManager> {
    return await Manager.findById(managerId);
  }

  public async updateManager(
    managerId: string,
    dto: Partial<IManager>,
  ): Promise<IManager> {
    return await Manager.findByIdAndUpdate(managerId, dto, { new: true });
  }

  public async getByEmail(email: string): Promise<IManager> {
    return await Manager.findOne({ email });
  }
}

export const managerRepository = new ManagerRepository();
