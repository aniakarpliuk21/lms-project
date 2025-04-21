import { FilterQuery } from "mongoose";

import { IOldPassword } from "../interfaces/password.interface";
import { OldPassword } from "../model/old-password.model";

class OldPasswordRepository {
  public async create(dto: Partial<IOldPassword>): Promise<IOldPassword> {
    return await OldPassword.create(dto);
  }
  public async getListByManagerId(managerId: string): Promise<IOldPassword[]> {
    return await OldPassword.find({ _managerId: managerId });
  }
  public async deleteManyByParams(
    params: FilterQuery<IOldPassword>,
  ): Promise<void> {
    await OldPassword.deleteMany(params);
  }
}
export const oldPasswordRepository = new OldPasswordRepository();
