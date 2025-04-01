import { IUser, IUserCreateDto } from "../interfaces/user.interface";
import { userRepository } from "../repositories/userRepository";

class UserService {
  public async register(dto: IUserCreateDto): Promise<IUser> {
    return await userRepository.create(dto);
  }
}
export const userService = new UserService();
