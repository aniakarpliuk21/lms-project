import { Types } from "mongoose";

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
  public async updateGroupById(
    groupId: string,
    studentId: string,
  ): Promise<IGroup> {
    const group = await Group.findById(groupId);
    if (!group) {
      throw new ApiError("Group not found", 404);
    }

    if (group.students.length >= 20) {
      throw new ApiError("Group is full (maximum 20 students)", 400);
    }
    group.students.push(new Types.ObjectId(studentId));
    return await group.save();
  }
}
export const groupService = new GroupService();
