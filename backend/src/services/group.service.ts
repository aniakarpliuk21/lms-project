import { ApiError } from "../errors/api-error";
import { IGroup } from "../interfaces/group.interface";
import { Group } from "../model/group.model";
import { groupRepository } from "../repositories/group.repository";

class GroupService {
  public async createGroup(name: string): Promise<IGroup> {
    const existingGroup = await Group.findOne({ name: name });
    if (existingGroup) {
      throw new ApiError("Group with this name already exists", 400);
    }
    return await groupRepository.createGroup(name);
  }
  public async getAllGroup(): Promise<IGroup[]> {
    return await groupRepository.getAllGroup();
  }
}
export const groupService = new GroupService();
