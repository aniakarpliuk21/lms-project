import { IUser, IUserCreateDto } from "../interfaces/user.interface";
import { User } from "../model/user.model";

class UserRepository {
  public async create(dto: IUserCreateDto): Promise<IUser> {
    return await User.create(dto);
  }
}
export const userRepository = new UserRepository();
