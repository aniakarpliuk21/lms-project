// import dotenv from "dotenv";
//
// import { RoleEnum } from "../enums/role.enum";
// import { ApiError } from "../errors/api-error";
// import { IAdminCreateDto } from "../interfaces/manager.interface";
// import { managerRepository } from "../repositories/manager.repository";
// import { authService } from "../services/auth.service";
//
// dotenv.config({ path: "../.env" });
//
// export const createAdmin = async () => {
//   const dto: IAdminCreateDto = {
//     name: "Admin",
//     surname: "admin",
//     email: "admin@gmail.com",
//     password: "admin",
//     role: RoleEnum.ADMIN,
//   };
//   try {
//     const adminExists = await managerRepository.getByEmail(dto.email);
//     if (!adminExists) {
//       await authService.registerAdmin(dto);
//     } else {
//       await managerRepository.deleteOneByEmail(dto.email);
//       await authService.registerAdmin(dto);
//     }
//   } catch (e) {
//     throw new ApiError(`Error creating admin:${e}`, 401);
//   }
// };
