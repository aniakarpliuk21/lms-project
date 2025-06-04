import { IGroup } from "../interfaces/group.interface";
import { Group } from "../model/group.model";

class GroupRepository {
  public async createGroup(name: string): Promise<IGroup> {
    return await Group.create({ name });
  }
  public async getAllGroup(): Promise<IGroup[]> {
    return await Group.find();
  }
}
export const groupRepository = new GroupRepository();
